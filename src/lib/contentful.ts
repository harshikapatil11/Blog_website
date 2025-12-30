// src/lib/contentful.ts
import { createClient } from "contentful";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";

// Define your Contentful "blogPost" fields exactly as they appear in your content model
interface BlogPostFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  excerpt?: EntryFieldTypes.Text;
  content: any; // or EntryFieldTypes.RichText if you use rich text
  coverImage?: EntryFieldTypes.AssetLink;
  publishedDate: EntryFieldTypes.Date;
}

// Proper typed skeleton
type BlogPostSkeleton = EntrySkeletonType<BlogPostFields, "blogPost">;

// Ensure env vars exist
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error("Missing Contentful environment variables");
}

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Public interface for blog posts
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  coverImage?: string;   // URL only
  coverAlt?: string;     // optional alt text
  publishedDate: string;
}

// Fetch all posts
export async function getPosts(): Promise<BlogPost[]> {
  const entries = await client.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
  });

  return entries.items.map((entry) => {
    const fields = entry.fields;
    return {
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt ?? "",
      content: fields.content,
      coverImage: fields.coverImage?.fields?.file?.url
        ? `https:${fields.coverImage.fields.file.url}`
        : undefined,
      coverAlt: fields.coverImage?.fields?.title ?? fields.title,
      publishedDate: fields.publishedDate,
    };
  });
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (!entries.items.length) return null;

  const fields = entries.items[0].fields;

  return {
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt ?? "",
    content: fields.content,
    coverImage: fields.coverImage?.fields?.file?.url
      ? `https:${fields.coverImage.fields.file.url}`
      : undefined,
    coverAlt: fields.coverImage?.fields?.title ?? fields.title,
    publishedDate: fields.publishedDate,
  };
}
