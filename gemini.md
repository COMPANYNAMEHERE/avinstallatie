# Gemini Context File

This file provides context for the AI agent working on the **AV Installatie** project.

## Project Overview
AV Installatie is a marketing website for an audio-visual installation service. It is built as a lightweight **Single Page Application (SPA)** using **Vanilla TypeScript** and **Vite**.

## Technology Stack
-   **Build Tool:** Vite 5
-   **Language:** TypeScript
-   **Framework:** None (Vanilla JS/TS)
-   **Styling:** CSS (BEM naming convention, scoped via imports)
-   **Routing:** Custom client-side routing in `src/pages/home.ts`
-   **Email:** EmailJS (`@emailjs/browser`)
-   **Localization:** Custom implementation in `src/content/`

## Architecture
The application primarily runs from `index.html`, which loads `src/pages/home.ts`.
-   **`src/pages/home.ts`**: The main controller. It handles:
    -   Initialization.
    -   Language switching.
    -   Routing between Home (`/`) and Contact (`/contact`).
    -   Rendering the layout.
-   **`src/logic/views/index.ts`**: Contains the "View" logic. It exports `mountHomePage` and `mountContactPage` which manipulate the DOM directly to render the scenes.
    -   **Home View**: Features a 3D interactive hero section (mouse/gyroscope parallax).
    -   **Contact View**: Renders a form on a notepad-style background.
-   **`contact-success.html`**: A separate HTML page served after a successful form submission. It is NOT part of the SPA routing but a standalone page that redirects back to the SPA after a countdown.

## Key Files & Directories
-   `src/pages/home.ts`: **Main Entry Point**. Logic for the SPA.
-   `src/pages/contact-success.ts`: Logic for the success page (redirects back to SPA).
-   `src/logic/views/index.ts`: **DOM Rendering**. All HTML generation for views happens here.
-   `src/logic/layout/index.ts`: **Layout Rendering**. Handles the site header/shell.
-   `src/content/`: Contains `en.ts`, `nl.ts` for translations.
-   `src/config/`: Configuration constants (EmailJS keys, etc.).
-   `src/styles/`: CSS files. `main.css` is global, `contact.css` is specific to the contact view but loaded globally.

## Development Conventions
-   **No Frameworks**: Do not introduce React, Vue, or other frameworks. Stick to vanilla DOM manipulation.
-   **Direct DOM**: Use `document.createElement`, `innerHTML`, or template strings for rendering.
-   **Type Safety**: Maintain strict TypeScript typing.
-   **Localization**: When adding text, add it to `src/content/en.ts` and `src/content/nl.ts` and update the `LocalizedContent` interface.
-   **Assets**: Images are in `assets/` (processed by Vite) or `public/` (copied as-is).

## Common Tasks
-   **Adding a Field to Contact Form**: Update `MountContactOptions` in `views/index.ts`, update HTML template in `mountContactPage`, and handle the new field in the `submit` event listener.
-   **Changing Content**: Edit files in `src/content/`.
-   **Styling**: Edit `src/styles/*.css`. Use CSS variables for theming.

## Known Issues/Quirks
-   The "Contact Success" page is a separate HTML file (`contact-success.html`) to ensure a clean state after form submission, but it redirects back to the SPA (`/contact`) automatically.
