# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Netlify (Recommended)

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist/plant-care-tracker/browser
   ```

4. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist/plant-care-tracker/browser`

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configuration** (vercel.json):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist/plant-care-tracker/browser",
     "framework": "angular"
   }
   ```

### Option 3: GitHub Pages

1. **Install angular-cli-ghpages:**
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. **Build with base href:**
   ```bash
   ng build --base-href=/plant-care-tracker/
   ```

3. **Deploy:**
   ```bash
   ngh --dir=dist/plant-care-tracker/browser
   ```

### Option 4: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure** (firebase.json):
   ```json
   {
     "hosting": {
       "public": "dist/plant-care-tracker/browser",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## Pre-Deployment Checklist

- [ ] Run production build: `npm run build`
- [ ] Test build locally: `npx http-server dist/plant-care-tracker/browser`
- [ ] Check all routes work
- [ ] Verify localStorage persistence
- [ ] Test on mobile devices
- [ ] Validate accessibility with Lighthouse
- [ ] Check console for errors

## Environment Configuration

### Production Settings
Update `angular.json` for production:
```json
{
  "production": {
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "namedChunks": false,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true
  }
}
```

## Performance Optimization

### Enable Compression
Most hosting providers support automatic compression. Ensure gzip/brotli is enabled.

### Service Worker (Optional)
Add PWA support for offline functionality:
```bash
ng add @angular/pwa
```

## Recording a Demo

### Option 1: Loom
1. Visit [loom.com](https://loom.com)
2. Install browser extension
3. Record screen + webcam
4. Share link

### Option 2: OBS Studio
1. Download OBS Studio
2. Set up screen capture
3. Record demo walkthrough
4. Upload to YouTube

### Demo Script
1. **Intro (15s)**: Show app overview
2. **Add Plant (30s)**: Fill form and submit
3. **View Plants (20s)**: Show different tabs
4. **Water Plant (15s)**: Click water button
5. **Filters (20s)**: Demonstrate tab filtering
6. **Mobile (20s)**: Show responsive design
7. **Outro (10s)**: Highlight key features

## Monitoring & Analytics

### Google Analytics (Optional)
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Build Errors
- Clear cache: `rm -rf .angular/cache`
- Reinstall: `rm -rf node_modules && npm install`

### Runtime Errors
- Check browser console
- Verify Material dependencies
- Test localStorage availability

### Deployment Issues
- Ensure correct build directory
- Check routing configuration
- Verify base href for subdirectory deployments

---

**Your app is ready to deploy! 🎉**
