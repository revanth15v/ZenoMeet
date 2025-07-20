# Zeno Meet AI

Zeno Meet AI is a modern video meeting and collaboration platform built with Next.js, TypeScript, and Drizzle ORM. It features authentication, real-time communication, sentiment analysis, and a modular architecture for scalable development.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project enables users to create, join, and manage video meetings with advanced features like:
- Authentication (sign-in/sign-up)
- Real-time chat and video
- Sentiment and communication analysis
- Data tables and pagination
- Responsive UI components

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database ORM:** Drizzle ORM
- **UI:** Custom components, Shadcn UI
- **State Management:** React hooks
- **APIs:** TRPC, Inngest, Azure Text Analytics
- **Styling:** CSS, PostCSS
- **Linting:** ESLint

## Folder Structure
```
src/
  app/           # Main app pages and layouts
  components/    # Reusable UI and logic components
  db/            # Database schema and connection
  hooks/         # Custom React hooks
  inngest/       # Event-driven functions
  lib/           # Utility libraries (auth, analytics, etc.)
  modules/       # Feature modules (auth, call, dashboard, meetings, etc.)
  trpc/          # TRPC client/server setup
public/          # Static assets (SVGs, icons)
```

## Getting Started
Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Edit pages in `src/app/`
- Add components in `src/components/`
- Update database schema in `src/db/schema.ts`
- Configure API routes in `src/app/api/`

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit and push (`git commit -m "Add feature"`)
5. Open a pull request

## License
This project is licensed under the MIT License.
