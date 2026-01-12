# Bucks2Bar - Budget Tracker: AI Coding Instructions

## Project Overview
Simple vanilla JavaScript budget tracker web application with interactive charts. Single-page app using Bootstrap 5 for UI and Chart.js for data visualization.

## Architecture
- **Pure client-side**: No backend, build process, or dependencies to install
- **Tab-based UI**: Bootstrap tabs separate data entry from chart visualization
- **Real-time validation**: Input validation happens on every keystroke
- **Chart lifecycle**: Chart is destroyed and recreated on tab switch to ensure fresh data

## Key Files
- [newbucks2bar/index.html](newbucks2bar/index.html): Complete app structure with 12 months of pre-filled sample data
- [newbucks2bar/script.js](newbucks2bar/script.js): All logic for validation, data collection, and chart rendering

## Critical Patterns

### UI elements
All buttons must be a pink color

### Input Handling Convention
- All month inputs follow strict ID pattern: `income-{monthId}` and `expense-{monthId}`
- Month IDs are 3-letter abbreviations stored in `monthIds` array: `['jan', 'feb', 'mar', ...]`
- Empty inputs treated as zero (not invalid) - see `collectData()` function
- Negative values trigger validation error with Bootstrap's `is-invalid` class

### Chart Rendering Flow
1. Chart only updates when switching to Chart tab (not on every keystroke)
2. `validateInputs()` must pass before chart creation
3. Existing chart instance destroyed via `budgetChart.destroy()` before new chart
4. Chart visibility controlled by toggling placeholder div and canvas display
5. Download button visibility tied to chart existence

### State Management
- Single global `budgetChart` variable holds Chart.js instance
- No localStorage or persistence - data resets on page reload
- Chart context obtained fresh each render: `canvas.getContext('2d')`

## Development Workflow
- **Testing**: Open [index.html](newbucks2bar/index.html) directly in browser (no build step)
- **Debugging**: All logic in [script.js](newbucks2bar/script.js) - set breakpoints in browser DevTools
- **Chart testing**: Switch to Chart tab to trigger `updateChart()` via Bootstrap's `shown.bs.tab` event

## External Dependencies (CDN)
- Bootstrap 5.3.0 for tabs, cards, forms, and grid system
- Chart.js 4.4.0 for bar chart visualization
- Both loaded via CDN in HTML `<head>` and before closing `</body>`

## Conventions
- Function names are descriptive verbs: `validateInputs()`, `collectData()`, `updateChart()`
- DOM queries use specific IDs, not classes (except for `.income-input`/`.expense-input` groups)
- Event listeners attached in `window.onload` to ensure DOM ready
- Chart options use `toLocaleString()` for currency formatting in Y-axis ticks

## When Adding Features
- Add new months: Update both `months` and `monthIds` arrays, plus HTML table rows
- New validation rules: Modify `validateInputs()` - validation runs on every input event
- Chart customization: Edit Chart.js config in `updateChart()` - options under `options.plugins` and `options.scales`
- Download formats: Extend `downloadChartAsPNG()` - canvas already supports `.toDataURL('image/jpeg')` etc.
