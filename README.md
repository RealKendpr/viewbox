# Viewbox

Display all your social links in one page, with your own customization.

My initial thought for this project is to make something that's like a single webpage for anyone to post about themselves, their group, their project, or maybe even make a landing page for thier products. It's like a personal website but just a single page.

As of now, its simply just a link page where anyone can put social links, but I hope that this project gets to my initial thought.

## Features

- Customizable layout and style from backgrounds, colors, text, buttons, borders, radius, etc.
- Analytics; page view duration, what links are clicked the most for a period of time

- a card display, carousel
- a paragraph section; that can include heading, images, links
- custom domain name
- maybe an options to put their own static code
- ...

## Usage

This is a Next.js project, and uses `npm`. <br/>

1. Clone the main branch of this repository

2. A `.env` file needs to be defined at the root of the project folder. Generate a secret in terminal:

```bash
# macOS or linux
openssl rand -base64 32
# Windows can use https://generate-secret.vercel.app/32
```

```env
// .env
SESSION_SECRET=your-secret-key

MONGODB_URI=mongodb-uri

UPLOADTHING_TOKEN=upload-thing-token

BETTER_AUTH_SECRET=your-secret-key

BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=google-client-id

GOOGLE_CLIENT_SECRET=google-client-secret
```

3. Install packages

```bash
npm install
```

4. Run

```bash
npm run dev
```

## Tech

- React/Next.js
- Mongodb
- Tailwind with DaisyUI
- Uploadthing
- Better Auth
- React Hook Form

## Roadmap?

- a card display, carousel
- a paragraph section; that can include heading, images, links
- custom domain name
- maybe an options to put their own static code
