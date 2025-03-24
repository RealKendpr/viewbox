# Onepage

Display all your social links in one page, with your own customization. My initial thought for this project is to something thats like a single webpage for anyone to post about themselve, their group, project, product, or make a landing page on it; like a personal website but just one single page.

## Features

- Customizable layout and style including backgrounds, colors, text, buttons, borders, radius, etc.
- Analytics; page view duration, what links are clicked the most for a period of time

- a card display, carousel
- a paragraph section; that can include heading, images, links
- custom domain name
- maybe an options to put their own static code
- ...

## Usage

This is a Next.js project, and using `npm`. <br/>
A `.env` file needs to be defined at the root of project folder.

Generate a secret in terminal:

```bash
# macOS
openssl rand -base64 32
# Windows can use https://generate-secret.vercel.app/32
```

```env
// .env
SESSION_SECRET=your-secret-key
MONGODB_URI=mongodb-uri
```

```npm
npm install
```

## Tech

- React/Next.js
- Mongodb
- Tailwind with DaisyUI
- React Hook Form

## Roadmap?

- a card display, carousel
- a paragraph section; that can include heading, images, links
- custom domain name
- maybe an options to put their own static code

##

- Page UI variations:

- borderless
- ghost buttons
- free
- link bento grid
- ...

Other options:

- open link in current or new tab
