import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

// Static params
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export const revalidate = 60;

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="bg-white">
      {/* HERO */}
      {post.coverImage && (
        <div className="relative h-[420px] w-full overflow-hidden">
            <Image
            src={post.coverImage}  // <-- use the string directly
            alt={post.coverAlt ?? post.title} // optional alt
            fill
            sizes="100vw"
            priority
            className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        )}


      {/* CONTENT */}
      <article className="relative -mt-32 max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <Badge className="mb-4 bg-yellow-400 text-black font-semibold">
            Blog
          </Badge>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {new Date(post.publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <hr className="my-8 border-yellow-200" />

          <div className="prose prose-lg max-w-none blog-content">
            {documentToReactComponents(post.content)}
          </div>
        </div>
      </article>
    </main>
  );
}
