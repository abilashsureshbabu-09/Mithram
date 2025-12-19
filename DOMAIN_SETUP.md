# Domain Configuration Instructions

You have configured your code to run on **mithramconstruction.com**.

### 1. DNS Configuration (Required)
You must go to your domain registrar (where you bought the domain, e.g., GoDaddy, Namecheap) and add the following records:

**A Records (for root domain):**
*   Host/Name: `@`
*   Value: `185.199.108.153`
*   TTL: Automatic/1 hour

*Add these 3 additional A records as well:*
*   `185.199.109.153`
*   `185.199.110.153`
*   `185.199.111.153`

**CNAME Record (for www):**
*   Host/Name: `www`
*   Value: `abilashsureshbabu-09.github.io`

### 2. GitHub Verification
1.  Go to **GitHub Service Settings** -> **Pages**.
2.  In the **Custom domain** field, you should see "mithramconstruction.com" (added by the CNAME file I created).
3.  Wait for the DNS check to pass.
4.  Check the "Enforce HTTPS" box once available.

### 3. Workflow
Your specific `gh-pages` deployment will now serve content relative to the root `/`, removing the `/Mithram` subpath.
