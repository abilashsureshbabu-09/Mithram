
# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
# If you have public env vars, add them here or use build-args
# ARG NEXT_PUBLIC_...
ENV NEXT_TELEMETRY_DISABLED 1

# Note: We need to disable 'output: export' in next.config.mjs for this to work as a server
# or we can use the static output with a different server. 
# For Cloud Run, a standalone server is usually preferred.
# We will assume the user or a script modifies next.config.mjs to remove "output: 'export'" 
# OR we can try to serve the static files with nginx.
# Let's target "standalone" output which is best for Next.js on Docker.
# We'll need to ensure next.config.js produces standalone output.
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
# mkdir .next is handled by next build usually
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# However, if next.config.mjs has "output: 'export'", there is no standalone folder.
# So we need to handle that.
#
# STRATEGY: We will assume the user wants to deploy the SERVER version (to support APIs potentially).
# So we should copy valid build artifacts. 
# If 'output: export' is set, 'npm run build' generates 'out/'.
# If so, we should use an nginx image to serve it.
#
# Given the user asked for "Google Cloud Console" (implies general web hosting), 
# and the app HAS api calls code (even if missing backend), 
# I will generate a Dockerfile that assumes a Node server (standard Next.js).
# 
# IMPORTANT: The user MUST remove "output: 'export'" from next.config.mjs for this Dockerfile to work fully as a Node server
# OR this Dockerfile needs to be an NGINX one.
#
# I will create a Node.js Dockerfile, and INSTRUCT the user to update config.

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
