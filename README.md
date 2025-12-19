# Mithram Constructions

A modern web application for Mithram Constructions, built with Next.js, Tailwind CSS, and Sanity CMS.

## Tech Stack
-   **Framework**: [Next.js 14](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **CMS**: [Sanity](https://www.sanity.io/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Database**: [Prisma](https://www.prisma.io/) (for Leads management)

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token
   DATABASE_URL="file:./dev.db"
   ```
4. Initialize the database:
   ```bash
   npx prisma db push
   ```

### Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Role & Usage

The application includes an internal Admin Dashboard and a Sanity Studio for content management.

### 1. Website Content (Sanity Studio)
Manage blogs, projects, and site-wide text.
-   **URL**: `/studio` (or [manage.sanity.io](https://manage.sanity.io))
-   **Usage**: Log in with your Sanity credentials to create, edit, or delete projects and blog posts.

### 2. Admin Dashboard (Internal)
Track leads and view site analytics.
-   **URL**: `/admin/dashboard`
-   **Features**:
    -   **Leads**: View and download details of experts/consultations requested via the "Talk to Expert" form.
    -   **Projects**: Quick view of project status.
    -   **Blogs**: Manage blog visibility.

### 3.
## Deployment

The application can be deployed using services that support Next.js, such as **Vercel** or **GitHub Pages** (for static versions). 

### GitHub Deployment (Vercel)
The easiest way to get a remote link is to:
1. Push your code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Vercel will automatically provide a remote link for every push.

## SEO & Accessibility
-   `robots.txt` is configured to allow crawling by search engines and AI bots (ChatGPT, GPTBot).
-   The site is fully mobile-responsive with a dedicated navigation menu.
