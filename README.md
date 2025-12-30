This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


# Blog_website

# Next.js + Contentful Mini Production App

## Overview
This is a **Contentful-driven mini marketing site** built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.  
The project demonstrates fetching content from Contentful, rendering blogs, and handling a contact form with **EmailJS**.

---

## Live Demo
[Deployed on Vercel](YOUR_VERCEL_URL)

---

## Features

### Home Page (`/`)
- Hero section with heading, subheading, and CTA button.
- Hero carousel showcasing blogs.
- Latest 3 blog posts with title and excerpt.

### Blog List (`/blog`)
- Lists all blog posts from Contentful.
- Displays title, excerpt, and published date.
- Responsive layout with loading and empty states.

### Blog Detail (`/blog/[slug]`)
- Renders blog content fetched by slug.
- Shows title, date, cover image, and rich text content.
- 404 page if slug not found.
- SEO metadata (title + description).

### Contact Us (`/contact`)
- EmailJS integration to send messages directly.
- Form with Name, Email, Phone, and Message fields.
- Success and error notifications.

### About Us
- Simple section with company/project description.

---

## Tech Stack
- **Next.js (App Router)** – React framework for frontend & routing.
- **TypeScript** – Ensures type safety.
- **Contentful** – Headless CMS (Delivery API only).
- **Tailwind CSS** – Utility-first styling.
- **shadcn/ui** – UI components (Card, Button, Badge, etc.).
- **EmailJS** – Client-side email form integration.
- **next/image** – Optimized images.
- **GitHub & Vercel** – Source control and deployment.

---

## Contentful Model
**Content Type:** BlogPost  
Required fields:
- `title` (short text, required)
- `slug` (short text, required, unique)
- `excerpt` (long text)
- `content` (rich text)
- `coverImage` (media)
- `publishedDate` (date)

**Seed:** Minimum 3 blog posts.

> Include a screenshot of your Contentful model here.

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

