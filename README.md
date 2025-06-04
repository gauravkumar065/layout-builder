# Layout Builder

A responsive layout builder built with Next.js, React, and Tailwind CSS that demonstrates adaptive UI patterns across different screen sizes.

## Features

### 📱 Responsive Behavior

#### Bottom Panel
- **Desktop (≥1024px)**: Fixed to the bottom of the viewport
- **Tablet (768px–1023px)**: Sticks to the bottom of the content
- **Mobile (<768px)**: Hidden by default, appears when floating button is pressed

#### Header
- **All devices**: Sticks to the top of the viewport on scroll
- **Scroll behavior**: Collapses (reduces height) when scrolling down, expands when scrolling up

#### Main Section
- **Desktop**: Expands to fill space between header and bottom panel
- **Tablet**: Independently scrollable content area
- **Mobile**: Collapses to show summary view, with expand/collapse functionality

### 🎨 Design Features

- **Resizable Panels**: All sections can be resized by dragging handles
- **Smooth Transitions**: Animated state changes and responsive breakpoint transitions
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Interactive Elements**: Tabs, buttons, and form controls in the bottom panel

### 🔧 Technical Implementation

#### Custom React Hooks
- `useLayoutState`: Manages layout state including panel visibility and responsive behavior
- `useScrollDirection`: Tracks scroll direction and position for header collapse behavior
- `useResponsive`: Handles responsive breakpoint detection

#### Reusable Components
- `Header`: Collapsible header with navigation elements
- `MainSection`: Content area with responsive behavior and expand/collapse
- `BottomPanel`: Multi-tab panel with preview, code, and settings
- `FloatingButton`: Mobile-only button to show/hide bottom panel
- `ResizablePanel`: Generic resizable container component

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the layout builder.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout-builder.tsx   # Main layout orchestrator
│   ├── header.tsx           # Collapsible header component
│   ├── main-section.tsx     # Responsive main content area
│   ├── bottom-panel.tsx     # Multi-tab bottom panel
│   ├── floating-button.tsx  # Mobile floating action button
│   └── resizable-panel.tsx  # Generic resizable container
├── hooks/
│   ├── use-layout-state.tsx # Layout state management
│   ├── use-responsive.tsx   # Responsive breakpoint detection
│   └── use-scroll-direction.tsx # Scroll behavior tracking
└── lib/
    └── utils.ts             # Utility functions
```

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px  
- **Desktop**: ≥ 1024px

## Technologies Used

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Key Features Demonstrated

✅ **Responsive Design**: Different layouts for mobile, tablet, and desktop  
✅ **Custom React Hooks**: Multiple hooks for state management and responsive behavior  
✅ **Reusable Components**: Modular component architecture  
✅ **Tailwind CSS**: Utility-first styling approach  
✅ **Interactive UI**: Resizable panels, collapsible sections, and smooth animations  
✅ **Modern React Patterns**: Hooks, context, and component composition

## License

MIT License - feel free to use this project as a reference or starting point for your own layout builders! 