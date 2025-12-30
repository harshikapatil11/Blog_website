// src/lib/contentful.ts

import { createClient } from 'contentful';
import type { EntryFieldTypes, EntrySkeletonType } from 'contentful';

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
type BlogPostSkeleton = EntrySkeletonType<BlogPostFields, 'blogPost'>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Your public interface for blog posts
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  coverImage?: {
    url: string;
    alt: string;
  };
  publishedDate: string;
}

export async function getPosts(): Promise<BlogPost[]> {
  // Filters out any entries with broken links (e.g. deleted images)
  const entries = await client.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
  });

  return entries.items.map((entry) => {
    const fields = entry.fields;

    return {
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt ?? '',
      content: fields.content,
      // Safe check: only create coverImage if the asset has a file
      coverImage:
        fields.coverImage &&
        fields.coverImage.fields.file &&
        fields.coverImage.fields.file.url
          ? {
              url: `https:${fields.coverImage.fields.file.url}`,
              alt: fields.coverImage.fields.title ?? fields.title,
            }
          : undefined,
      publishedDate: fields.publishedDate,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  if (entries.items.length === 0) {
    return null;
  }

  const entry = entries.items[0];
  const fields = entry.fields;

  return {
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt ?? '',
    content: fields.content,
    coverImage:
      fields.coverImage &&
      fields.coverImage.fields.file &&
      fields.coverImage.fields.file.url
        ? {
            url: `https:${fields.coverImage.fields.file.url}`,
            alt: fields.coverImage.fields.title ?? fields.title,
          }
        : undefined,
    publishedDate: fields.publishedDate,
  };
}