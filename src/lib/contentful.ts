import { createClient, type EntryFieldTypes, type EntrySkeletonType, type Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types"; // use for rich text

interface BlogPostFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  excerpt?: EntryFieldTypes.Text;
  content: EntryFieldTypes.RichText; // instead of any
  coverImage?: EntryFieldTypes.AssetLink;
  publishedDate: EntryFieldTypes.Date;
}

type BlogPostSkeleton = EntrySkeletonType<BlogPostFields, "blogPost">;

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error("Missing Contentful environment variables");
}

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Public interface
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: Document; // instead of any
  coverImage?: string;
  coverAlt?: string;
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
      content: fields.content, // now properly typed
      coverImage: fields.coverImage?.fields?.file?.url
        ? `https:${fields.coverImage.fields.file.url}`
        : undefined,
      coverAlt: fields.coverImage?.fields?.title ?? fields.title,
      publishedDate: fields.publishedDate,
    };
  });
}

// Fetch post by slug
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
