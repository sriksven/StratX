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

GitHub Pages is free and works well for static sites. This project is now configured with **automated deployment via GitHub Actions**.

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** → **"Pages"**
3. Under **"Build and deployment"** → **"Source"**, select **"GitHub Actions"**
4. Click **"Save"**

### Step 2: Push to Main Branch

The deployment workflow is already configured! Simply push to `main`:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 3: Monitor Deployment

1. Go to the **"Actions"** tab in your repository
2. Watch the **"Deploy to GitHub Pages"** workflow run
3. Once complete (green checkmark), your site is live!

Your site will be available at: `https://yourusername.github.io/StratX/`

### Manual Deployment Trigger

You can also manually trigger a deployment:

1. Go to **"Actions"** tab
2. Select **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"**
4. Select the branch (usually `main`)
5. Click **"Run workflow"**

### How It Works

The automated workflow (`.github/workflows/deploy.yml`):
1. Triggers on every push to `main` branch
2. Builds the frontend using Node.js 20
3. Runs `npm ci` and `npm run build`
4. Uploads the `dist` folder as an artifact
5. Deploys to GitHub Pages

### Configuration Files

- **`.github/workflows/deploy.yml`**: GitHub Actions workflow
- **`frontend/vite.config.ts`**: Vite config with base path `/StratX/`
- **`frontend/public/.nojekyll`**: Prevents Jekyll processing

### Updating Your Deployment

Simply push changes to `main` - the workflow handles everything automatically!

```bash
git add .
git commit -m "Update site"
git push origin main
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

**Already configured!** The workflow at `.github/workflows/deploy.yml` automatically deploys on every push to `main`.

The workflow:
- Builds the frontend with Node.js 20
- Uses `npm ci` for reliable installs
- Deploys the `dist` folder to GitHub Pages
- Prevents concurrent deployments to avoid conflicts

No additional setup needed - just enable GitHub Pages in your repository settings and select "GitHub Actions" as the source.

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
