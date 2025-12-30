"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BlogCarousel from "@/components/ui/BlogCarousel";
import { Button } from "@/components/ui/button";
import Header from "./header";

type Props = {
  posts: any[];
};

export default function HomeClient({ posts }: Props) {
  return (
    <main className="relative overflow-hidden">

    <Header />
    <section id="about">
      {/*  HERO */}
      <section className="relative min-h-screen bg-[#FDB515] flex items-center justify-center overflow-hidden">

        {/* Floating blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 bg-white max-w-7xl w-full mx-6 rounded-3xl shadow-2xl px-14 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14"
        >
          {/* LEFT */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Be a creator with ideas<br />
              A thinker with clarity<br />
              & a mind with purpose
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-md">
              Stories, tutorials and modern design insights.
            </p>

            <Button className="mt-8 w-fit rounded-full bg-[#FDB515] px-10 py-6 text-lg font-semibold text-black hover:scale-105 transition">
              Read more
            </Button>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 6, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0 bg-[#FDB515] rounded-[60%_40%_50%_50%] -z-10"
            />

            <Image
              src="/what-is-motivation.jpg"
              alt="Hero"
              width={500}
              height={600}
              className="rounded-[50%_50%_40%_60%] object-cover shadow-xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= BLOG / CAROUSEL ================= */}
<section
  id="blog"
  className="relative py-24 bg-gradient-to-b from-purple-100 to-white"
>
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center text-4xl font-bold mb-14"
  >
    Latest Updates
  </motion.h2>

  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    <BlogCarousel posts={posts} />
  </motion.div>
</section>

    </section>
    </main>
  );
}
