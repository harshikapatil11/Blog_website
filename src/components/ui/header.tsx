"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          kodie
        </Link>

        {/* Nav */}
        <ul className="flex gap-10 text-sm font-medium text-gray-700">

          {/* ABOUT → HERO */}
          <li>
            <Link href="/#about" className="hover:text-black transition">
              About
            </Link>
          </li>

          {/* BLOG → CAROUSEL */}
          <li>
            <Link href="/#blog" className="hover:text-black transition">
              Blog
            </Link>
          </li>

          {/* CONTACT → PAGE */}
          <li>
            <Link href="/contact" className="hover:text-black transition">
              Contact Us
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}
