# Plant Care Tracker - Design System Specification

## 🎨 Color Palette

### Primary Colors

- **Primary Green**: `#2e7d32` (Material Green 800)
  - Used for: Toolbar, primary buttons, active states
- **Primary Green Light**: `#689f38` (Material Green 700)
  - Used for: Focus outlines, accents

### Accent Colors

- **Accent Blue**: `#2196f3` (Material Blue 500)
  - Used for: Links, secondary actions
- **Warning Orange**: `#ff9800` (Material Orange 500)
  - Used for: Warning indicators, needs water badge
- **Error Red**: `#f44336` (Material Red 500)
  - Used for: Delete buttons, urgent states
- **Success Green**: `#4caf50` (Material Green 500)
  - Used for: Success messages, healthy status

### Background Colors

- **Page Background**: `#f5f5f5` (Light Gray)
- **Card Background**: `#ffffff` (White)
- **Needs Water Card**: `#fff3f3` (Light Red Tint)
- **Success State**: `#d4edda` (Light Green)
- **Warning State**: `#fff3cd` (Light Yellow)
- **Notes Background**: `#f5f5f5` (Gray)

### Text Colors

- **Primary Text**: `rgba(0, 0, 0, 0.87)`
- **Secondary Text**: `rgba(0, 0, 0, 0.6)`
- **Disabled Text**: `rgba(0, 0, 0, 0.38)`
- **Icon Color**: `rgba(0, 0, 0, 0.54)`

---

## 📐 Typography

### Font Family

- **Primary**: Roboto, "Helvetica Neue", sans-serif

### Font Sizes & Weights

- **H1 (Toolbar Title)**: 24px, Weight 500
- **H2 (Page Title)**: 28px, Weight 500
- **H3 (Empty State)**: 24px, Weight 400
- **Card Title**: 20px, Weight 500
- **Card Subtitle**: 14px, Weight 400
- **Body Text**: 14px, Weight 400
- **Small Text**: 13px, Weight 400
- **Tiny Text**: 12px, Weight 400
- **Button Text**: 14px, Weight 500

---

## 📏 Spacing & Layout

### Container Widths

- **Max Content Width**: 1400px
- **Form Max Width**: 800px
- **Standard Content**: 1200px

### Padding & Margins

- **Page Padding**: 20px
- **Card Padding**: 16px
- **Section Spacing**: 32px
- **Element Gap**: 8px, 12px, 16px, 20px, 24px

### Border Radius

- **Small**: 4px (inputs, chips)
- **Medium**: 8px (cards, containers)
- **Large**: 20px (stat badges)

### Shadows

- **Light**: `0 2px 4px rgba(0, 0, 0, 0.1)`
- **Medium**: `0 2px 8px rgba(0, 0, 0, 0.1)`
- **Heavy**: `0 8px 16px rgba(0, 0, 0, 0.15)`

---

## 🧩 Components

### 1. Toolbar (Navigation Bar)

**Dimensions**: Full width, sticky top, ~64px height
**Structure**:

```
[🌿 Icon] [Plant Care Tracker] [My Plants] [Add Plant] [💧 Badge] [🌱 Count]
```

- Background: Primary Green (#2e7d32)
- Text: White
- Icons: 32px (logo), 20px (nav)
- Active link: White background with 20% opacity
- Badge: Warning color with count

### 2. Plant Card

**Dimensions**: Min 300px width, auto height
**Structure**:

```
┌─────────────────────────┐
│   [Plant Image 200px]   │
├─────────────────────────┤
│ 🌸 Plant Name           │
│ Species Name            │
├─────────────────────────┤
│ 📅 Every X days         │
│ 💧 Last watered: Date   │
│ 📆 X days ago           │
│ 📝 Notes...             │
├─────────────────────────┤
│ [⚠️ Status Chip]        │
├─────────────────────────┤
│ [💧 Water] [🗑️ Delete] │
└─────────────────────────┘
```

- Border: 4px left border (transparent or red)
- Shadow: Medium, Heavy on hover
- Hover: Translate up 4px
- Image: 200px height, object-fit cover
- Status Chip: Warning (yellow) or Success (green)

### 3. Add Plant Form

**Dimensions**: Max 800px width
**Fields**:

1. Plant Name (text input) - Required, min 2 chars
2. Species (dropdown) - Required
3. Last Watered Date (date picker) - Required
4. Watering Frequency (dropdown) - Required
5. Image URL (text input) - Optional, URL validation
6. Notes (textarea, 3 rows) - Optional

**Button**: Primary raised button with icon

### 4. Tab Group

**Tabs**:

- All Plants (🔲 icon)
- Needs Water (⚠️ icon, orange)
- Upcoming (📅 icon)
- Healthy (🌿 icon, green)

**Style**:

- Background: White
- Border radius: 8px
- Active indicator: Underline
- Min width per tab: 140px

### 5. Empty State

**Structure**:

```
     [Large Icon 64px]

     Heading Text
     Subtitle text
```

- Centered alignment
- Icon: Gray or colored (green for success)
- Padding: 60px vertical

### 6. Footer

**Content**:

```
❤️ Built with Angular 20 + Signals + Material Design
AI-Assisted Development with Claude Code & MCP Servers
```

- Background: Primary Green
- Text: White
- Icon: Pink (#ff4081)
- Font size: 14px / 12px

---

## 📱 Responsive Breakpoints

### Desktop (> 768px)

- Grid: Auto-fill, min 300px columns
- Full navigation with text labels
- Standard padding: 20px
- Stats visible in toolbar

### Mobile (≤ 768px)

- Grid: Single column
- Navigation: Icons only (no text)
- Reduced padding: 12px
- Toolbar wraps (3 rows)

### Small Mobile (≤ 480px)

- Title: 16px
- Icons: 24px
- Compressed stats

---

## 🎭 Icons (Material Icons)

### Navigation

- `local_florist` - App logo
- `home` - My Plants
- `add_circle` - Add Plant
- `water_drop` - Water status
- `grass` - Plant count

### Plant Card

- `local_florist` - Plant icon
- `schedule` - Frequency
- `calendar_today` - Date
- `event` - Days ago
- `note` - Notes
- `warning` - Needs water
- `check_circle` - Healthy
- `delete` - Delete action
- `image` - Image field

### Tabs

- `grid_view` - All plants
- `warning` - Needs water
- `event` - Upcoming
- `eco` - Healthy plants

---

## 🎬 Animations

### Transitions

- **Hover**: 0.3s ease
- **Page transitions**: 0.3s
- **Tab switch**: 300ms

### Keyframes

**Fade In**:

```
From: opacity 0, translateY(10px)
To: opacity 1, translateY(0)
Duration: 0.3s ease-in
```

**Pulse (Warning)**:

```
0%, 100%: opacity 1
50%: opacity 0.7
Duration: 2s infinite
```

---

## 🔄 Interactive States

### Buttons

- **Default**: Solid color
- **Hover**: Slight shadow increase
- **Active**: Pressed state
- **Disabled**: 38% opacity

### Cards

- **Default**: Light shadow
- **Hover**: Translate -4px, heavy shadow
- **Needs Water**: Red left border, pink background

### Links

- **Default**: White text
- **Hover**: 10% white overlay
- **Active**: 20% white overlay

---

## 📊 Plant Grid Layout

```
Grid Template: repeat(auto-fill, minmax(300px, 1fr))
Gap: 20px
```

Mobile: 1 column
Tablet: 2 columns
Desktop: 3-4 columns

---

## 🎯 Key UI Patterns

### Material Design 3 Components Used

- Toolbar (AppBar)
- Cards
- Buttons (Raised, Flat)
- Form Fields (Outline style)
- Date Picker
- Select Dropdown
- Tabs
- Badges
- Icons
- Chips
- Snackbar (Notifications)

### Accessibility

- ARIA labels on all interactive elements
- Focus visible outline: 2px green
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly

---

## 📸 Sample Image URLs

Default plant images from Unsplash:

- Monstera: `https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400`
- Snake Plant: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIrNtrXX8GSmhYmBEpUrGiG-XvR8nB_lyvQ&s`
- Peace Lily: `https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400`

---

## 🎨 Figma Design Tips

1. **Create Components**:

   - Plant card (with variants: default, needs-water)
   - Button (primary, secondary, danger)
   - Form field (text, select, textarea)
   - Tab (active, inactive)
   - Badge (warning, success)
   - Empty state

2. **Use Auto Layout**:

   - For cards, forms, toolbars
   - Set proper spacing and padding
   - Enable wrapping for responsive behavior

3. **Create Styles**:

   - Color palette as color styles
   - Typography as text styles
   - Shadow effects as effect styles

4. **Frames**:

   - Desktop: 1440px width
   - Tablet: 768px width
   - Mobile: 375px width

5. **Plugins to Use**:
   - Unsplash (for plant images)
   - Material Design Icons
   - Lorem ipsum (for sample data)

---

## 📋 Pages to Design

### 1. Home Page (My Plants)

- Toolbar with navigation
- Tab group with 4 tabs
- Plant cards in grid layout
- Empty states for each tab
- Footer

### 2. Add Plant Page

- Toolbar with navigation
- Page title with icon
- Form with all fields
- Submit button
- Footer

### 3. Mobile Versions

- Same pages but responsive
- Collapsed navigation
- Single column grid

---

## 🎁 Bonus Elements

### Status Chips

- **Warning**: Yellow background (#fff3cd), brown text
- **Success**: Green background (#d4edda), dark green text
- With icons (warning/check_circle)
- Border: 1px solid accent color

### Notifications (Snackbar)

- Position: Bottom center
- Background: Dark gray
- Text: White
- Duration: 3 seconds
- Action button: "Close"

---

This specification contains everything you need to recreate your Plant Care Tracker design in Figma!
