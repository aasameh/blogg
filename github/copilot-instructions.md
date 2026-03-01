# Copilot Instructions

This project is a blog application built as a monorepo with three parts:
- **client/** — Vite + React frontend styled with Tailwind CSS
- **server/** — Node.js (Express) backend API layer
- **directus/** — Directus headless CMS backed by PostgreSQL

Directus manages content (posts, categories, tags, images, authors). The Express server proxies/transforms Directus responses into a clean blog API. The React app renders the blog.

## Coding Standards

- Use camelCase for variable and function names.
- Use PascalCase for component names.
- Use single quotes for strings.
- Use 2 spaces for indentation.
- Use arrow functions for callbacks.
- Use async/await for asynchronous code.
- Use const for constants and let for variables that will be reassigned.
- Use destructuring for objects and arrays.
- Use template literals for strings that contain variables.
- Use the latest JavaScript features (ES6+) where possible.

## Architecture

- Frontend communicates only with the Express backend (`/api/*`).
- Express backend proxies requests to Directus REST API.
- Directus admin UI is used by authors to write/edit posts and upload images.
- PostgreSQL is the database for Directus.

## Key URLs (Development)

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Directus Admin: http://localhost:8055
