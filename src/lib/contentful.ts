import { createClient } from 'contentful';
import type { Entry, EntryCollection, Asset } from 'contentful'; 


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


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: 'blogPost', 
  }) as EntryCollection<unknown>;

  
  return entries.items.map((item: Entry<unknown>) => {
    const fields = item.fields as any; 
    const coverImageAsset = fields.coverImage as Asset | undefined;

    return {
      title: fields.title as string,
      slug: fields.slug as string,
      excerpt: fields.excerpt as string || '', 
      content: fields.content,
      coverImage: coverImageAsset ? {
        url: `https:${coverImageAsset.fields.file.url}`,
        alt: coverImageAsset.fields.title || fields.title, 
      } : undefined,
      publishedDate: fields.publishedDate as string,
    };
  });
}


export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  }) as EntryCollection<unknown>;

  if (entries.items.length === 0) {
    return null;
  }

  const item = entries.items[0];
  const fields = item.fields as any;
  const coverImageAsset = fields.coverImage as Asset | undefined;

  return {
    title: fields.title as string,
    slug: fields.slug as string,
    excerpt: fields.excerpt as string || '',
    content: fields.content,
    coverImage: coverImageAsset ? {
      url: `https:${coverImageAsset.fields.file.url}`,
      alt: coverImageAsset.fields.title || fields.title,
    } : undefined,
    publishedDate: fields.publishedDate as string,
  };
}