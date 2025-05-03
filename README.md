# Anime Search App

A modern, colorful, and responsive web app for searching anime using the Jikan API. Features include dark mode, theme toggle, beautiful gradients, and a clean UI built with React, TypeScript, Tailwind CSS, and Vite.

## Features

- **Anime Search:** Search for anime by title, genre, or keyword.
- **Anime Details:** View detailed information about each anime.
- **Pagination:** Browse through multiple pages of search results.
- **Dark Mode:** Toggle between light and dark themes with a single click.
- **Colorful UI:** Soft gradients, purple accents, and a modern look.
- **Responsive Design:** Works great on desktop and mobile.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/animesearchapp.git
   cd animesearchapp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App in Development
```bash
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```
- The production-ready files will be in the `dist/` folder.

### Linting & Formatting
- **Lint:**
  ```bash
  npm run lint
  ```
- **Format:**
  ```bash
  npm run format
  ```

## Usage
- Use the search bar to find anime by title or keyword.
- Click on an anime card to view details.
- Use the pagination controls to browse more results.
- Toggle dark mode using the button in the header.

## Customization
- **Colors & Theme:**
  - The app uses Tailwind CSS for styling. You can adjust colors in `tailwind.config.js` and component files.
  - Gradients and purple accents are used for a modern, vibrant look.
- **API:**
  - Powered by the [Jikan API](https://jikan.moe/).

## License
MIT 