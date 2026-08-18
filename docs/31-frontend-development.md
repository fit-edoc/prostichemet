# Frontend Development

## Tech Stack
- React 18+ & Next.js 14+ (App Router).
- TypeScript for strong typing.
- Tailwind CSS for styling (or custom CSS as preferred, but keep it consistent).

## Component Architecture
- **Server Components (RSC) by Default**: Fetch data on the server wherever possible for better performance and SEO.
- **Client Components**: Use the 'use client' directive only for interactive components (forms, states, hooks).
- **Design System**: Use a consistent UI library (e.g., shadcn/ui or Radix) to maintain a cohesive, accessible interface.

## State Management
- Prefer React Query or SWR for remote data fetching and caching on the client side.
- Use React Context for global UI state (e.g., currently selected workspace, theme).
- Keep component-level state local using useState and useReducer.

## Forms & Validation
- Use React Hook Form combined with Zod for all forms (e.g., business profile creation, campaign setup).
- Display clear validation errors to the user.

## Loading & Error States
- Use Next.js loading.tsx and error.tsx for route-level boundaries.
- Implement skeleton loaders for a smooth perceived performance during data fetching.
- For AI generation steps, show meaningful progress indicators (e.g., "Researching Acme Corp...").
