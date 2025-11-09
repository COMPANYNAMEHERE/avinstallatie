# AV Installatie Web App

## Overview
This repository contains the source for the AV Installatie marketing site. The frontend is built with [Vite](https://vitejs.dev/) and vanilla TypeScript. Two entrypoints are provided:

- `src/main.ts` renders the landing page experience, including the responsive sidebar navigation and hover interactions on the hero panel.
- `src/contact.ts` powers the contact form page with dynamic validation messaging and EmailJS integration.

Localized content is defined in `src/content.*.ts`, enabling runtime switching between supported languages. Shared configuration such as EmailJS identifiers and contact categories lives in `src/config.ts`.

## Key Runtime Behaviors
- **Sidebar controller** – `src/main.ts` wires the header toggle button and pointer-drag gesture to the responsive sidebar navigation, updating ARIA attributes for accessibility.
- **Language selection** – Both entrypoints read from `localizedContent` and persist user language choice via `storeLanguagePreference`, allowing consistent translations across pages.
- **Contact form submission** – `src/contact.ts` validates required fields, toggles UI status messaging, and sends the payload through EmailJS when the required environment variables are configured.

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
│   ├── config.ts           # EmailJS configuration and contact categories
│   ├── content*.ts         # Localized copy and helper utilities
│   ├── contact.ts          # Contact page entrypoint and form logic
│   ├── main.ts             # Landing page entrypoint and sidebar controls
│   └── style.css           # Shared styling for both entrypoints
├── index.html              # Landing page HTML shell
├── contact.html            # Contact page HTML shell
├── contact-success.html    # Post-submission success page
├── package.json            # Scripts and dependency manifest
└── vite.config.ts          # Vite configuration
```
