# The Wrong List

> *Wrong by most standards, right by the ones that matter.*

A curated, invite-only directory of unconventional thinkers who have been labelled "too different" in their professional lives.

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later

---

## Installation

```bash
npm install
```

---

## Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
app/                    Next.js App Router pages
  layout.tsx            Root layout (fonts, grain SVG filter)
  page.tsx              Home — hero + directory list
  about/page.tsx        "What is this?" page
  curator/page.tsx      "Who made this" — renders the jomiro profile
  people/[id]/page.tsx  Individual profile pages
components/
  NavBar.tsx            Fixed nav — logo fades in on scroll (home), always visible elsewhere
  HamburgerButton.tsx   Animated hamburger → X button
  MenuOverlay.tsx       Full-screen nav overlay with "surprise me" feature
  GradientBackground.tsx Animated gradient blobs + grain texture overlay
  ProfileRow.tsx        Single row in the home directory list
  ProfilePage.tsx       Shared profile layout (used by /people/[id] and /curator)
data/
  people.json           All person data
lib/
  types.ts              TypeScript types
  people.ts             getPeople() and getPersonById() helpers
public/
  assets/               logo.svg and tagline.svg (replace with real assets)
  photos/               Person photos (optional — see below)
```

---

## How to add a person

1. Open `data/people.json` and add a new entry following the existing schema:

```json
{
  "id": "unique-kebab-case-id",
  "name": "Full Name",
  "tagline": "Short descriptor",
  "quote": "\"What they were told was wrong.\"",
  "tags": ["virtual coffee", "open to collabs"],
  "bio": "First paragraph.\n\nSecond paragraph.\n\nThird paragraph.",
  "website": "https://example.com",
  "linkedin": "https://linkedin.com/in/handle",
  "email": "name@example.com",
  "photo": "https://picsum.photos/seed/your-id/400/400",
  "backgroundColor": "teal"
}
```

2. Valid `backgroundColor` values: `"red"`, `"teal"`, or `"indigo"`.

3. To use a real photo instead of the picsum placeholder: add a `.jpg` or `.png` to `public/photos/` and update the `"photo"` field to `/photos/filename.jpg`.

---

## How to swap in real assets

Replace the placeholder files in `public/assets/` with your real SVGs:

- `public/assets/logo.svg` — the main logo mark / wordmark
- `public/assets/tagline.svg` — the tagline as an SVG (or remove the `<Image>` and render it as text)

No code changes needed — the components reference these paths directly.

---

## Deploying to Vercel

1. Push the repository to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the repository — Vercel auto-detects Next.js. No configuration needed.
4. Click **Deploy**.

Every subsequent push to `main` triggers an automatic redeploy.
