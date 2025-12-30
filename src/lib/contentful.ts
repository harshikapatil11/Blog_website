// src/lib/contentful.ts

import { createClient, type EntryFieldTypes, type EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

interface BlogPostFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  excerpt?: EntryFieldTypes.Text;
  content: EntryFieldTypes.RichText;
  coverImage?: EntryFieldTypes.AssetLink;
  publishedDate: EntryFieldTypes.Date;
}

type BlogPostSkeleton = EntrySkeletonType<BlogPostFields, "blogPost">;

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error("Missing Contentful environment variables: CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN");
}

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Public interface used in your components
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  coverImage?: string;     // direct URL string (or undefined)
  coverAlt?: string;       // alt text for accessibility
  publishedDate: string;
}

export async function getPosts(): Promise<BlogPost[]> {
  const entries = await client.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
  });

  return entries.items.map((entry) => {
    const fields = entry.fields;

    const coverUrl = fields.coverImage?.fields?.file?.url
      ? `https:${fields.coverImage.fields.file.url}`
      : undefined;

    return {
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt ?? "",
      content: fields.content,
      coverImage: coverUrl,
      coverAlt: fields.coverImage?.fields?.title ?? fields.title,
      publishedDate: fields.publishedDate,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  const fields = entries.items[0].fields;

  const coverUrl = fields.coverImage?.fields?.file?.url
    ? `https:${fields.coverImage.fields.file.url}`
    : undefined;

  return {
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt ?? "",
    content: fields.content,
    coverImage: coverUrl,
    coverAlt: fields.coverImage?.fields?.title ?? fields.title,
    publishedDate: fields.publishedDate,
  };
}