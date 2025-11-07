# 🚀 Quick Start Guide

## Prerequisites Check

Before you begin, ensure you have:
- ✅ Node.js 20.x or higher (`node --version`)
- ✅ npm 10.x or higher (`npm --version`)
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Navigate to Project Directory
```powershell
cd C:\plant-care-tracker
```

### 2. Install Dependencies
```powershell
npm install
```

This will install:
- Angular 18+ framework
- Angular Material components
- TypeScript compiler
- Development tools

**Expected time:** 2-5 minutes

### 3. Start Development Server
```powershell
npm start
```

Or with Angular CLI directly:
```powershell
npx ng serve
```

The app will automatically open at: **http://localhost:4200/**

### 4. Verify Installation

You should see:
- ✅ Green toolbar with "Plant Care Tracker" title
- ✅ "Add New Plant" form
- ✅ 3 sample plants in the grid
- ✅ Tab navigation (All Plants, Needs Water, Upcoming, Healthy)
- ✅ No console errors

## First Steps

### Try These Actions:
1. **Add a Plant**: Fill out the form and click "Add Plant"
2. **Water a Plant**: Click the "Water Now" button on any card
3. **Switch Views**: Click different tabs to filter plants
4. **Check Responsive**: Resize browser window to see mobile layout
5. **Delete a Plant**: Click "Delete" and confirm

## Troubleshooting

### Common Issues

#### Issue: `npm install` fails
**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
Remove-Item -Recurse -Force node_modules
npm install
```

#### Issue: Port 4200 already in use
**Solution:**
```powershell
# Use different port
ng serve --port 4300
```

#### Issue: Angular CLI not found
**Solution:**
```powershell
# Install Angular CLI globally
npm install -g @angular/cli
```

#### Issue: TypeScript errors
**Solution:**
```powershell
# Install TypeScript
npm install typescript@~5.4.0 --save-dev
```

#### Issue: Build errors
**Solution:**
```powershell
# Clear Angular cache
Remove-Item -Recurse -Force .angular

# Rebuild
npm run build
```

## Available Scripts

```powershell
# Start development server
npm start

# Build for production
npm run build

# Run in watch mode
npm run watch

# Lint code (if configured)
ng lint

# Run tests (if configured)
npm test
```

## Project Structure

```
plant-care-tracker/
├── src/
│   ├── app/
│   │   ├── components/      # UI components
│   │   ├── models/          # TypeScript interfaces
│   │   ├── services/        # Business logic
│   │   └── app.component.*  # Root component
│   ├── assets/              # Images, fonts, etc.
│   ├── styles.scss          # Global styles
│   ├── index.html           # HTML entry point
│   └── main.ts              # Application bootstrap
├── node_modules/            # Dependencies (auto-generated)
├── dist/                    # Production build (auto-generated)
├── angular.json             # Angular configuration
├── package.json             # Project metadata
├── tsconfig.json            # TypeScript configuration
└── README.md                # Documentation
```

## Next Steps

### Explore the Code
1. **State Management**: `src/app/services/plant.service.ts`
   - See signals in action
   - Computed signals for filtering
   - LocalStorage integration

2. **Components**: `src/app/components/`
   - Modern signal inputs/outputs
   - Material UI integration
   - Responsive design patterns

3. **Styling**: `src/styles.scss`
   - Custom Material theme
   - Responsive breakpoints
   - Animation definitions

### Customize
- **Theme Colors**: Edit `src/styles.scss` (lines 5-7)
- **Sample Data**: Modify `src/app/services/plant.service.ts` (line 140+)
- **Watering Frequencies**: Update `src/app/components/add-plant-form/add-plant-form.component.ts` (line 37+)

### Deploy
See `DEPLOYMENT.md` for detailed deployment instructions to:
- Netlify
- Vercel
- GitHub Pages
- Firebase

## Learning Resources

### Angular 20 Signals
- [Official Signals Guide](https://angular.dev/guide/signals)
- [Zoneless Angular](https://angular.dev/guide/experimental/zoneless)

### Material Design
- [Angular Material](https://material.angular.io/)
- [Component Documentation](https://material.angular.io/components)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

### Check Documentation
1. `README.md` - Project overview
2. `AI_WORKFLOW.md` - Development process
3. `FEATURES.md` - Feature checklist
4. `DEPLOYMENT.md` - Deployment guides

### Common Questions

**Q: Can I use this with Angular 17?**
A: Yes, most features work with Angular 17+. Adjust package.json versions.

**Q: How do I add more plants?**
A: Use the "Add New Plant" form at the top of the page.

**Q: Where is data stored?**
A: In browser localStorage. Clear browser data to reset.

**Q: Can I change the theme colors?**
A: Yes! Edit the Material theme in `src/styles.scss`.

**Q: Is this production-ready?**
A: Yes! Run `npm run build` to create optimized production build.

## Success Indicators

You'll know everything is working when:
- ✅ App loads without errors
- ✅ You can add/delete plants
- ✅ Watering updates immediately
- ✅ Tabs filter correctly
- ✅ Data persists on refresh
- ✅ Mobile layout works (resize window)

## Development Tips

### Hot Reload
The dev server auto-reloads on file changes. Just save and see updates instantly!

### Debug Mode
Open Chrome DevTools (F12) to:
- Inspect component state
- Monitor network requests
- Check localStorage data
- View console logs

### Performance
Check with Lighthouse (Chrome DevTools > Lighthouse):
- Performance score
- Accessibility score
- Best practices
- SEO

---

**🎉 You're all set! Happy coding!**

For questions or issues, refer to the documentation or create an issue in your repository.
