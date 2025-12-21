
# Deploying to Google Cloud Run

Since you are asking to deploy to Google Cloud Console, **Google Cloud Run** is the best option for Next.js applications as it supports server-side features (like APIs) and auto-scaling.

## Prerequisites

1.  **Google Cloud Project**: Create one at [console.cloud.google.com](https://console.cloud.google.com).
2.  **Billing Enabled**: Ensure billing is enabled for your project.
3.  **Google Cloud SDK**: Install `gcloud` CLI if you want to deploy from your terminal.

## Setup Steps

### 1. Update Configuration

Your project is currently set up for Static Export (GitHub Pages). For Cloud Run, we need a standard server build.

1.  Open `next.config.mjs`.
2.  Change `output: 'export'` to `output: 'standalone'`.

```javascript
const nextConfig = {
    output: 'standalone', // Change this line
    images: {
        unoptimized: true,
        // ...
    }
};
```

### 2. Build the Docker Image

If you have `docker` installed:

```bash
# Replace PROJECT-ID with your Google Cloud Project ID
gcloud auth configure-docker
docker build -t gcr.io/PROJECT-ID/mithram-app .
docker push gcr.io/PROJECT-ID/mithram-app
```

### 3. Deploy

```bash
gcloud run deploy mithram-app \
  --image gcr.io/PROJECT-ID/mithram-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Option B: Deploy via Console (No CLI)

1.  **Push your code** to GitHub.
2.  Go to **Google Cloud Console** > **Cloud Run**.
3.  Click **Create Service**.
4.  Select **Continuously deploy new revisions from a source repository**.
5.  Click **Set up with Cloud Build**.
6.  Connect your Node.js repository.
7.  **Important**: Click "Advanced Settings" (or Build Context) and ensure the `Dockerfile` is being used (it should auto-detect).
8.  In the "Environment variables" section, you might need to add builds args if required, but standard setup should work.
9.  Save and Deploy.

*Note: Ensure you updated `next.config.mjs` before pushing!*

## API Routes Note
Your contact form tries to POST to `/api/leads`. This route does not currently exist in your project. You should create `app/api/leads/route.ts` to handle form submissions, otherwise the form will show an error.
