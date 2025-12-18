# 🚀 StratX Deployment Guide

This guide covers deploying the StratX dashboard to **Vercel** (recommended) or **GitHub Pages**.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- GitHub account
- Vercel account (for Vercel deployment)

---

## Option 1: Deploy to Vercel (Recommended) ⭐

Vercel is the recommended platform as it provides:
- Automatic HTTPS
- Global CDN
- Zero-config deployment
- Environment variable management
- Automatic deployments on git push

### Step 1: Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables (optional):
   - `VITE_API_URL`: Your backend API URL
6. Click **"Deploy"**

Your app will be live at `https://your-project.vercel.app` in ~2 minutes!

### Step 3: Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? stratx (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

### Step 4: Configure Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed

---

## Option 2: Deploy to GitHub Pages

GitHub Pages is free and works well for static sites, but requires a bit more setup.

### Step 1: Update Vite Configuration

Edit `frontend/vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/StratX/', // Replace with your repository name
})
```

### Step 2: Install gh-pages

```bash
cd frontend
npm install --save-dev gh-pages
```

### Step 3: Add Deploy Scripts

Edit `frontend/package.json` and add these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 4: Deploy

```bash
npm run deploy
```

This will:
1. Build your app
2. Create a `gh-pages` branch
3. Push the build to that branch

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** → **"Pages"**
3. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **"Save"**

Your site will be live at `https://yourusername.github.io/StratX/` in a few minutes!

### Updating Your Deployment

To update your GitHub Pages site:

```bash
npm run deploy
```

---

## Environment Variables

### For Vercel

Add in the Vercel dashboard under **"Settings"** → **"Environment Variables"**:

```
VITE_API_URL=https://your-backend-api.com/api
```

### For GitHub Pages

Since GitHub Pages doesn't support server-side environment variables:

1. Create `frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-backend-api.com/api
   ```

2. **Important**: Add `.env.production` to `.gitignore` if it contains sensitive data

3. Or hardcode the API URL in `frontend/src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'https://your-backend-api.com/api';
   ```

---

## Troubleshooting

### Vercel Issues

**Build fails:**
- Check that `package.json` has all dependencies
- Verify Node.js version (use 18+)
- Check build logs in Vercel dashboard

**404 on routes:**
- Vercel should handle this automatically with the `vercel.json` config
- Make sure `vercel.json` exists in the `frontend` directory

### GitHub Pages Issues

**Blank page after deployment:**
- Check that `base` in `vite.config.ts` matches your repo name
- Verify the `gh-pages` branch was created
- Check browser console for errors

**404 errors:**
- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html`

**Assets not loading:**
- Verify `base` path in `vite.config.ts` is correct
- Check that asset paths are relative, not absolute

---

## Performance Optimization

### Before Deployment

1. **Optimize images**: Use WebP format, compress images
2. **Code splitting**: Vite does this automatically
3. **Remove console.logs**: Clean up debug code
4. **Enable compression**: Both Vercel and GitHub Pages support gzip

### After Deployment

1. **Monitor performance**: Use Lighthouse or WebPageTest
2. **Check bundle size**: Run `npm run build` and check `dist` folder
3. **Enable caching**: Configure in `vercel.json` or GitHub Pages settings

---

## Continuous Deployment

### Vercel

Automatic! Every push to `main` triggers a deployment.

To deploy from a different branch:
1. Go to project settings in Vercel
2. **"Git"** → **"Production Branch"**
3. Change to your preferred branch

### GitHub Pages

Set up GitHub Actions for automatic deployment:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          
      - name: Build
        run: |
          cd frontend
          npm run build
          
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

---

## Next Steps

After deployment:

1. ✅ Test your live site thoroughly
2. ✅ Set up custom domain (optional)
3. ✅ Configure analytics (Google Analytics, Plausible, etc.)
4. ✅ Set up monitoring (Sentry for error tracking)
5. ✅ Share your project!

---

## Support

If you encounter issues:
- Check the [Vercel documentation](https://vercel.com/docs)
- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue in the repository

Happy deploying! 🏎️💨
