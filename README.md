# Guitar Hero Site

This project is a web application that showcases a collection of albums, allowing users to browse and view details about each album. It is built using React and TypeScript, and utilizes Vite for development and build processes.

## Features

- **Album Browsing**: Users can view a list of albums on the Albums page.
- **Album Details**: Users can click on an album to view detailed information, including a track list.
- **Responsive Design**: The site is designed to be responsive and user-friendly.

## Project Structure

```
guitar-hero-site
├── src
│   ├── main.tsx          # Entry point of the application
│   ├── App.tsx           # Main App component with routing
│   ├── pages
│   │   ├── AlbumsPage.tsx # Component displaying list of albums
│   │   └── AlbumPage.tsx  # Component showing details of a specific album
│   ├── components
│   │   ├── Header.tsx     # Navigation bar component
│   │   ├── AlbumGrid.tsx   # Component for displaying albums in a grid
│   │   ├── AlbumCard.tsx   # Component representing an individual album
│   │   ├── AlbumDetails.tsx # Component for detailed album information
│   │   └── TrackList.tsx   # Component displaying tracks of an album
│   ├── hooks
│   │   └── useAlbums.ts    # Custom hook for managing album data
│   ├── services
│   │   └── api.ts          # API functions for fetching album data
│   ├── styles
│   │   ├── variables.css    # CSS variables for consistent styling
│   │   └── global.css       # Global styles for the application
│   └── types
│       └── index.ts        # TypeScript types and interfaces
├── public
│   └── index.html          # Main HTML template for the application
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── vite.config.ts          # Vite configuration file
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd guitar-hero-site
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.