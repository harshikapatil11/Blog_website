import { getPosts } from '@/lib/contentful';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 60; // ISR every 60 seconds

async function BlogListContent() {
  let posts;

  try {
    posts = await getPosts();
  } catch (error) {
    return (
      <p className="text-center text-red-500 mt-20">
        Failed to load posts.
      </p>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20">
        No posts available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[30%] font-semibold text-black">
              Title
            </TableHead>
            <TableHead className="w-[50%] font-semibold text-black">
              Excerpt
            </TableHead>
            <TableHead className="w-[20%] font-semibold text-black">
              Published
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.slug}
              className="transition-colors hover:bg-yellow-50"
            >
              <TableCell>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-black hover:text-yellow-600 transition"
                >
                  {post.title}
                </Link>
              </TableCell>

              <TableCell className="text-gray-600 line-clamp-2">
                {post.excerpt}
              </TableCell>

              <TableCell>
                <Badge className="bg-yellow-100 text-yellow-900 font-medium">
                  {new Date(post.publishedDate).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }
                  )}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function BlogList() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-black">
        Blog Articles
      </h1>

      <Suspense fallback={<p className="text-center">Loading posts...</p>}>
        <BlogListContent />
      </Suspense>
    </div>
  );
}
