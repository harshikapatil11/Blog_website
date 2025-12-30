"use client";

import { BlogPost } from "@/lib/contentful";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface BlogCarouselProps {
  posts: BlogPost[];
}

const AUTOPLAY_DELAY = 6000;

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  if (!posts.length) {
    return (
      <p className="text-center text-muted-foreground py-20">
        No posts available yet.
      </p>
    );
  }

  return (
    <section className="relative overflow-hidden py-24 bg-yellow-400">
  
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-yellow-500/80 blur-[120px]" />
    <div className="absolute right-0 top-40 h-[500px] w-[600px] rounded-full bg-yellow-400/50 blur-3xl" />
    <div className="absolute -bottom-20 left-20 h-80 w-80 rounded-full bg-yellow-300/40 blur-3xl" />
  </div>

  {/* Carousel */}
  <div className="relative z-10">
    <Swiper
      modules={[EffectCreative, Pagination, Autoplay]}
      effect="creative"
      grabCursor
      centeredSlides
      slidesPerView={1}
      loop
      autoplay={{
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false,
      }}
      creativeEffect={{
        prev: { shadow: true, translate: ["-100%", 0, -500], scale: 0.85 },
        next: { shadow: true, translate: ["100%", 0, -500], scale: 0.85 },
      }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => `
          <button class="${className} custom-bullet">
            <svg viewBox="0 0 48 48">
              <circle class="bg-circle" cx="24" cy="24" r="22" />
              <circle class="progress-ring" cx="24" cy="24" r="22" />
            </svg>
            <span class="bullet-number">${index + 1}</span>
          </button>
        `,
      }}
      className="w-full max-w-6xl mx-auto !pb-20 !overflow-visible"
    >
      {posts.map((post, index) => (
        <SwiperSlide key={post.slug}>
          <Card className="rounded-3xl overflow-hidden shadow-2xl bg-white/95 backdrop-blur mx-4">
            <div className="grid md:grid-cols-2 h-[520px]">
              {/* Text */}
              <div className="flex flex-col justify-center px-10 lg:px-16">
                {index === 0 && (
                  <Badge className="w-fit mb-4 bg-yellow-100 text-yellow-700 border-yellow-300">
                    Featured
                  </Badge>
                )}

                <h3 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                  {post.title}
                </h3>

                <p className="mt-6 text-lg text-gray-700 line-clamp-4">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`}>
                  <Button
                    size="lg"
                    className="mt-10 w-fit rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                  >
                    Read more
                  </Button>
                </Link>
              </div>

              {/* Image */}
              <div className="relative h-full overflow-hidden rounded-l-[60px]">
                <Image
                    src={post.coverImage ?? "/what-is-motivation.jpg"} // use coverImage as string
                    alt={post.title} // optional: you can add a separate alt field if you want
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />

                <div className="absolute inset-0 bg-gradient-to-l from-yellow-400/40 via-yellow-300/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

  );
}
