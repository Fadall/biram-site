# Biram Pathe Fall — Reading Space

This project is a minimalist, elegant personal website for the author Biram Pathe Fall. It is designed for an optimal mobile reading experience, with content managed centrally via Sanity CMS.

## Technical Stack

- **Framework**: React + Vite (following the requested architecture)
- **Styling**: Tailwind CSS
- **CMS**: Sanity (integrated Studio)
- **Routing**: React Router
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## Project Structure

- `/src/components`: UI components (BilletView, AvantProposView, PenseeView, Calendar, etc.)
- `/src/lib`: Utilities, types, GROQ queries, and the Sanity client.
- `/src/hooks`: Data-fetching logic.
- `/src/sanity`: Schemas for Sanity Studio.

## Content Types

1. **Billet (Post)**: Published on Mondays, Wednesdays, and Fridays. Includes a photo of the author and a long-form text.
2. **Avant-propos (Foreword)**: Published on Sundays, Tuesdays, and Thursdays. Previews the following day’s reflection. Features a clean, text-focused design.
3. **Pensée du samedi (Saturday Thought)**: Published on Saturdays. Includes an atmospheric photo and a poetic or reflective text.

## Installation

1. Clone the project.
2. Install dependencies: `npm install`
3. Configure Sanity:
   - Create a project at [sanity.io/manage](https://sanity.io/manage)
   - Add the `projectId` to `.env.local` and `src/lib/sanity.client.ts`.
4. Launch the Studio: `npx sanity start` (in a separate Sanity folder if necessary, or via the integrated Studio configuration). 5. Launch the site: `npm run dev`

## Administration

The author can access the administration interface via the `/studio` route (if configured with `next-sanity` or by using the standard Sanity Studio).

## Design System

- **Typography**:
  - Headings: Playfair Display
  - Body text: Lora
  - UI: Inter
- **Colors**:
  - Background: #FAFAF7
  - Post: #2C4A7C
  - Foreword: #B8860B
  - Thought: #6B4C8C
