# AV Installatie Web App

## Overview
This repository contains the source for the AV Installatie marketing site. The frontend is built with [Vite](https://vitejs.dev/) and vanilla TypeScript.

The application is structured as a Single Page Application (SPA) for the main navigation, handling both the landing page and the contact form.

- `src/pages/home.ts` acts as the main entry point and router, managing the landing page and the contact view overlay.
- `src/logic/views/index.ts` contains the rendering logic for the 3D hero scene and the contact form.

Localized content is defined in `src/content/`, enabling runtime switching between supported languages. Shared configuration such as EmailJS identifiers and contact categories lives in `src/config/index.ts`.

## Key Runtime Behaviors
- **SPA Routing** – `src/pages/home.ts` handles client-side routing between the home view (`/`) and contact view (`/contact`).
- **Interactive 3D Hero** – The landing page features a 3D-like interactive hero section powered by pointer events and device orientation (gyroscope).
- **Language selection** – Reads from `localizedContent` and persists user language choice via `localStorage`.
- **Contact form submission** – Validates required fields, toggles UI status messaging, and sends the payload through EmailJS.

## Development

### Prerequisites
- Node.js 18 or newer (Vite 5 requires Node 18+)
- npm (bundled with Node.js)

### Install dependencies
```bash
npm install
```

### Start the development server
```bash
npm run dev
```
This launches Vite with hot module replacement on the default port.

### Build for production
```bash
npm run build
```
Outputs an optimized bundle to the `dist/` directory.

### Preview the production build
```bash
npm run preview
```
Serves the `dist/` output locally using Vite's preview server.

## Environment Variables
Configure the following variables in a `.env` file (or your hosting provider) to enable EmailJS submissions from the contact form:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Without these values, the contact form will remain in a disabled state to prevent invalid submissions.

## Repository Layout
```
├── assets/                 # Static images referenced by the UI
├── public/                 # Static assets copied as-is during builds
├── src/
│   ├── config/             # Configuration (EmailJS, constants)
│   ├── content/            # Localized content
│   ├── logic/              # Business logic and view renderers
│   ├── pages/              # Page entry points (home.ts, contact-success.ts)
│   └── styles/             # CSS stylesheets
├── index.html              # Main SPA HTML shell
├── contact-success.html    # Post-submission success page
├── package.json            # Scripts and dependency manifest
└── vite.config.ts          # Vite configuration
```