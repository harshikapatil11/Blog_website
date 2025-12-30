import { getPosts } from "@/lib/contentful";
import HomeClient from "@/components/ui/HomeClient";

export const revalidate = 60;

export default async function Home() {
  const posts = await getPosts(3);

  return <HomeClient posts={posts} />;
}
