# Viewbox

Display all your social links in one page, with your own customization.

My initial thought for this project is to make something that's like a single webpage for anyone to post about themselves, their group, their project, or maybe even make a landing page for thier products. It's like a personal website but just a single page.

As of now, its simply just a link page where anyone can put social links, but I hope that this project gets to my initial thought.

## Contributing

Viewbox welcomes any form of contributions, big or small from anyone.

- You may report any issues you found.
- Submit or contribute a feature that you want to see in this project.
- Fix an existing bug or issue.
- Create and/or improve documentations.
- UI design improments.

## Features

- Layout presets
- Multiple pages
- Customizable background, colors etc.
- More features coming as we undergo development.

### Upcoming features

- Analytics
- Custom domain
- Custom code import
- Multiple element options - instead of just a list of links there should also be other elements like: paragraphs, images, headings, cards, carousels, etc.

## Usage

If you want to contribute or play around with the project here is a breif guide. This is a Next.js project, and uses `npm`. <br/>

1. Clone the main branch of this repository

2. A `.env` file is needed at the root of the project folder.

Generate a secret in terminal:

```bash
# macOS or linux
openssl rand -base64 32
# Windows can use https://generate-secret.vercel.app/32
```

```toml
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

### File Structure

```bash
./src/app/
├── api
├── (home)
│   ├── (auth)
│   └── dashboard
│       ├── delete-account
│       └── (forms)
│           ├── create
│           ├── [pages]
│           │   ├── layouts
│           │   ├── options
│           │   └── styles
│           └── _utils
├── (pages)
│   └── [pages]
└── _utils
```

- api - contains all the api routes including the authentication route.
- (home) - is a group folder to organize, and contain the layout that is shared between pages
  - (auth) - contains everythings thats for the login and authentication route in client-side.
  - dashboard - contains all the routes for managing the user's account and pages inside that account.
    - (forms) - contains the routes for creating and editing the user's page
- (pages)/[pages] - is a dynamic route that generates all of the pages from the database that was created by all users.

## Tech

- React/Next.js
- MongoDB
- Tailwind with DaisyUI
- Uploadthing
- Better Auth
- React Hook Form

## Roadmap?

- a carousel element
- a paragraph section; that can include heading, images, links
- custom domain name
- maybe an options to import your own static code
