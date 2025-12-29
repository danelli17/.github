# Temperature Logger Application

A modern, high-contrast temperature logging system designed for fast-paced kitchen environments.

## Features

- **Professional Logging Form**: Input equipment name, temperature (°C), and staff initials
- **Visual Safety Alerts**: Temperatures above 5°C are highlighted in red with warning indicators
- **Precise Timestamps**: Each entry is saved with an exact timestamp
- **Recent Logs Display**: View the last 10 temperature logs in an easy-to-read table
- **High-Contrast Dark Theme**: Glassmorphism design with pure white text for maximum legibility
- **Touch-Friendly**: Large tap targets (48px+ height) optimized for busy kitchen staff

## Design Specifications

### UI/UX Features
- **Background**: Deep charcoal (#121212) with glassmorphism effects
- **Typography**: Large, bold, pure white text for maximum legibility under bright lights
- **Input Fields**: Large tap targets with high-contrast borders
- **No White Backgrounds**: All elements use dark theme with glass effects
- **Consistent Styling**: High-contrast design across all components

### Safety Features
- Automatic temperature validation
- Visual warnings for temperatures exceeding 5°C
- Red highlighting for safety risks
- Warning icons for immediate visual feedback

## Technology Stack

- **React 18**: Modern component-based UI framework
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Glassmorphism**: Modern glass-effect styling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Usage

1. Navigate to the `/temperature` route
2. Fill in the form:
   - **Equipment Name**: e.g., "Walk-in Fridge"
   - **Temperature**: Numeric value in °C
   - **Staff Initials**: 2-4 characters
3. Submit to log the entry
4. View recent logs in the table below

## File Structure

```
├── src/
│   ├── components/
│   │   └── TemperatureLogger.jsx    # Main logging component
│   ├── pages/
│   │   ├── HomePage.jsx              # Landing page
│   │   └── TemperaturePage.jsx       # Temperature logging page
│   ├── App.jsx                       # Main app with routing
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles with Tailwind
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
└── package.json                      # Project dependencies
```

## Component Details

### TemperatureLogger Component
Located at [`src/components/TemperatureLogger.jsx`](src/components/TemperatureLogger.jsx)

**State Management:**
- Form inputs (equipment name, temperature, staff initials)
- Log history (last 10 entries)
- Temperature validation

**Key Features:**
- Real-time temperature validation
- Automatic timestamp generation
- Form reset after submission
- Responsive table display
- High-contrast glassmorphism styling

## Color Scheme

- Background: `#121212` (Deep charcoal)
- Text: `#FFFFFF` (Pure white)
- Glass effect: `rgba(255, 255, 255, 0.05-0.1)` with backdrop blur
- Borders: `rgba(255, 255, 255, 0.1-0.3)`
- Warning: Red tones for temperatures > 5°C
- Focus states: Blue accent colors

## Accessibility

- High contrast ratios for readability
- Large, touch-friendly buttons (minimum 48px height)
- Clear visual feedback for all interactions
- Semantic HTML structure
- Keyboard navigation support

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
