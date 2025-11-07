# 🌱 Plant Care Tracker

A modern, feature-rich Angular 20 application for tracking plant care schedules with signal-based state management and Material Design.

![Angular](https://img.shields.io/badge/Angular-20-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Material](https://img.shields.io/badge/Material-UI-purple)
![Signals](https://img.shields.io/badge/State-Signals-green)

## ✨ Features

### Core Functionality
- **Plant Management**: Add, view, and delete plants with detailed information
- **Watering Tracking**: Track last watered date and watering frequency for each plant
- **Smart Notifications**: Computed signals automatically detect plants needing water
- **Multiple Views**: Filter plants by status (All, Needs Water, Upcoming, Healthy)
- **Data Persistence**: LocalStorage integration for automatic data saving

### Technical Highlights
- ✅ **Angular 20** with standalone components (no NgModules)
- ✅ **Zoneless Change Detection** for improved performance
- ✅ **Signal-based State Management** (signal(), computed(), input(), output())
- ✅ **Modern Control Flow** (@if, @for, @switch)
- ✅ **Angular Material UI** with custom green theme
- ✅ **Responsive Design** - mobile-friendly with breakpoints
- ✅ **Accessibility** - ARIA labels, keyboard navigation, semantic HTML
- ✅ **Animations** - smooth transitions and visual feedback

### Material Components Used
1. **MatCard** - Plant display cards with elevation
2. **MatButton** - Action buttons throughout
3. **MatIcon** - Visual icons for better UX
4. **MatFormField** - Input fields with validation
5. **MatSelect** - Dropdown menus for species and frequency
6. **MatDatepicker** - Date selection for watering dates
7. **MatTabs** - Organized view filtering
8. **MatToolbar** - Application header
9. **MatBadge** - Notification badges
10. **MatChip** - Status indicators
11. **MatTooltip** - Helpful hover information
12. **MatSnackbar** - Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Navigate to project directory
cd plant-care-tracker

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200/`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🎨 Custom Material Theme

The application uses a custom Material Design theme with:
- **Primary Color**: Green (#2e7d32) - representing plant growth
- **Accent Color**: Blue (#2196f3) - for interactive elements
- **Warn Color**: Red - for alerts and warnings

Theme customization can be found in `src/styles.scss`.

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Grid layout with multiple columns
- **Tablet**: 768px - Single column with optimized spacing
- **Mobile**: < 480px - Compact layout with touch-friendly targets

## 🧠 Signal-based State Management

The application leverages Angular Signals for reactive state management:

### Signals Used
```typescript
// Writable signal for plant list
private plantsSignal = signal<Plant[]>([]);

// Computed signal for plants needing water
readonly plantsNeedingWater = computed(() => {
  // Automatically recalculates when plants change
});

// Input signal for component props
plant = input.required<Plant>();

// Output signal for events
onWater = output<string>();
```

### Benefits
- **Automatic Updates**: UI updates when signals change
- **Performance**: Fine-grained reactivity, no zone.js overhead
- **Type Safety**: Full TypeScript support
- **Computed Values**: Derived state with memoization

## 🤖 AI-Assisted Development Workflow

This project was developed using **Claude Code + MCP (Model Context Protocol) Servers** for enhanced AI-assisted development.

### AI Tools & Workflow

#### 1. **Claude Code Integration**
- Real-time code generation and suggestions
- Component scaffolding with best practices
- TypeScript type safety recommendations
- Angular-specific pattern suggestions

#### 2. **MCP Servers Used**
- **File System MCP**: For project structure creation
- **Git MCP**: Version control integration
- **Documentation MCP**: Auto-generated code documentation

#### 3. **Development Process**

**Phase 1: Planning & Architecture** (AI-Assisted)
- Requirements analysis and feature breakdown
- Component hierarchy design
- State management architecture with Signals
- Material component selection

**Phase 2: Implementation** (AI-Generated)
- Service creation with signal-based state
- Standalone component generation
- Reactive forms implementation
- Material theming customization

**Phase 3: Enhancement** (AI-Optimized)
- Accessibility improvements (ARIA labels)
- Responsive design breakpoints
- Animation and transition effects
- LocalStorage persistence

**Phase 4: Documentation** (AI-Generated)
- Inline code comments
- README creation
- TypeScript interface documentation
- User guide sections

### AI Contribution Highlights

✅ **100% of component boilerplate** generated by AI
✅ **Signal patterns and computed logic** recommended by AI
✅ **Accessibility attributes** automatically added
✅ **Responsive CSS** generated with mobile-first approach
✅ **TypeScript types and interfaces** fully AI-generated
✅ **Documentation and comments** AI-written

### Prompt Examples Used

1. "Create an Angular service using signals to manage a plant collection with computed signals for plants needing water"
2. "Generate a Material card component using input/output signals and modern control flow syntax"
3. "Add accessibility features including ARIA labels and keyboard navigation"
4. "Create responsive CSS with mobile breakpoints for a plant grid layout"

### Creative AI Usage

- **Automatic Sample Data**: AI generated realistic plant species and care schedules
- **Icon Selection**: AI suggested semantic Material icons for each action
- **Color Palette**: AI recommended green/blue theme matching plant care context
- **Error Handling**: AI added form validation with user-friendly messages

## 📂 Project Structure

```
plant-care-tracker/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── plant-card/
│   │   │   │   ├── plant-card.component.ts
│   │   │   │   ├── plant-card.component.html
│   │   │   │   └── plant-card.component.scss
│   │   │   └── add-plant-form/
│   │   │       ├── add-plant-form.component.ts
│   │   │       ├── add-plant-form.component.html
│   │   │       └── add-plant-form.component.scss
│   │   ├── models/
│   │   │   └── plant.model.ts
│   │   ├── services/
│   │   │   └── plant.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.scss
│   ├── styles.scss
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Key Implementation Details

### Zoneless Change Detection

```typescript
// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations()
  ]
});
```

### Modern Control Flow

```html
<!-- Using @if, @for instead of *ngIf, *ngFor -->
@if (plants().length === 0) {
  <div class="empty-state">No plants yet</div>
} @else {
  @for (plant of plants(); track plant.id) {
    <app-plant-card [plant]="plant" />
  }
}
```

### Signal Components

```typescript
export class PlantCardComponent {
  // Input signal (replaces @Input)
  plant = input.required<Plant>();
  
  // Output signal (replaces @Output)
  onWater = output<string>();
  
  // Emit event
  waterPlant(): void {
    this.onWater.emit(this.plant().id);
  }
}
```

## ♿ Accessibility Features

- **ARIA Labels**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard support
- **Semantic HTML**: Proper use of header, main, section, article
- **Focus Indicators**: Visible focus states for keyboard users
- **Screen Reader Support**: Status announcements and context
- **Color Contrast**: WCAG AA compliant color combinations

## 🎨 Animations

- **Fade-in**: Smooth entry animations for new elements
- **Pulse**: Attention-grabbing animation for urgent notifications
- **Hover Effects**: Card elevation on hover
- **Tab Transitions**: Smooth view switching

## 💾 Data Persistence

Plant data automatically saves to browser localStorage:
- Survives page refreshes
- Separate storage per browser
- JSON serialization with date handling
- Error handling for storage quota

## 🔮 Future Enhancements

- [ ] Figma design tokens integration
- [ ] Advanced filtering and search
- [ ] Plant health tracking and notes
- [ ] Photo upload for each plant
- [ ] Watering history and statistics
- [ ] Export/import plant collections
- [ ] Progressive Web App (PWA) support
- [ ] Cloud sync across devices

## 📝 License

This project is created for educational purposes and demonstration of Angular 20 features.

## 🙏 Acknowledgments

- **Angular Team** for the amazing framework and Signals API
- **Material Design Team** for the comprehensive component library
- **Claude AI** for AI-assisted development capabilities
- **MCP Protocol** for enhanced development workflow

---

**Built with ❤️ using Angular 20, Signals, and AI assistance**

*This project demonstrates modern Angular development practices including standalone components, zoneless change detection, signal-based state management, and AI-assisted coding workflows.*
