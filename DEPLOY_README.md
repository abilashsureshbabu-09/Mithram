# Deployment Instructions

1.  **Wait for Build**: The "Deploy to GitHub Pages" action is currently running in the **Actions** tab of your repository.
2.  **Enable Pages**:
    *   Go to **Settings** > **Pages**.
    *   Under "Build and deployment", set **Source** to **GitHub Actions**.
3.  **Secrets (Optional but Recommended)**:
    *   If you see "Dataset not found" errors in the build logs, you need to add your Sanity Project ID as a secret.
    *   Go to **Settings** > **Secrets and variables** > **Actions**.
    *   Add `NEXT_PUBLIC_SANITY_PROJECT_ID` with your project ID.

Your site will be available at: https://abilashsureshbabu-09.github.io/Mithram/
