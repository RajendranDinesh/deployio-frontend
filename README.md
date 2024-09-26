# Deploy-IO Frontend
A Simple Vercel Clone's Frontend

## Description
This is the frontend for Deploy-IO, built using Vite, TypeScript, Tailwind, and ShadCN.

## Installation
Before proceeding, ensure you have the following installed:
- Node.js (v18 or greater)
- npm or yarn

To set up the project, follow these steps:
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:

```bash
npm install
# or
yarn install
```

## Usage
### Development
To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

This will launch the Vite development server, and the app will be accessible at `http://localhost:5173`.

### Building for Production
To create a production build, run:

```bash
npm run build
# or
yarn build
```

The optimized production files will be generated in the dist folder.

## Linting and Formatting
- Lint the codebase:

```bash
npm run lint
# or
yarn lint
```
- Format the code with Prettier:

```bash
npm run format
# or
yarn format
```
## Core Networking
The app uses a central networking file where the Request function is defined. This function handles all communication with the backend, ensuring a consistent API layer across the app.

## Features
- Vite for fast builds and HMR
- TypeScript for type safety
- Tailwind CSS and ShadCN for styling
- Prettier and ESLint for code formatting and linting
