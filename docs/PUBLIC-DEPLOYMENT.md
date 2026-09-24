# Public deployment for QALQAN

## Architecture

GitHub Pages is static-only, so the frontend can be published there, but the AI backend must be deployed separately.

Recommended setup:

- Frontend: GitHub Pages
- AI backend: Render / Railway / Fly.io / VPS
- Gemini API key: server-side only, never in the browser

## Required frontend environment

Set this in GitHub repository variables before deploying the Pages workflow:

```env
NEXT_PUBLIC_CHAT_API_URL=https://your-backend.example.com/api/chat
```

## Required backend environment

Use a public server hosting platform and set:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
PORT=3001
```

Start the backend with:

```bash
node api/server.js
```

The server exposes:

- POST /api/chat
- GET /health

## GitHub Pages deploy

1. Push the repo to GitHub.
2. Open repository Settings → Pages.
3. Set "Build and deployment" to "GitHub Actions".
4. Ensure the workflow runs from the main or master branch.
5. Add the repo variable `NEXT_PUBLIC_CHAT_API_URL`.
6. The site will be published automatically after push.

## Access from another computer

Once the backend is public and the frontend is published on GitHub Pages, users can open the GitHub Pages URL and use QALQAN AI from any machine.
