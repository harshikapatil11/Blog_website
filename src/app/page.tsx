import { getPosts, BlogPost } from "@/lib/contentful";
import HomeClient from "@/components/ui/HomeClient";

export const revalidate = 60;

export default async function Home() {
  // Fetch latest 3 posts
  const posts: BlogPost[] = await getPosts();

  return <HomeClient posts={posts} />;
}
