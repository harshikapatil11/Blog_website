"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!formRef.current) return;

  const formData = new FormData(formRef.current);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const time = new Date().toLocaleString();

  setSending(true);
  emailjs.send(
    "service_kk3ascu",
    "template_45pvtvs",
    { name, email, phone, message, time },
    "CkEYcszgeikBVkrdj"
  )
  .then(
    () => {
      setSuccess("Message sent successfully!");
      formRef.current?.reset();
    },
    () => setSuccess("Failed to send message. Try again.")
  )
  .finally(() => setSending(false));
};


  return (
    <main className="relative min-h-screen bg-[#FDB515] overflow-hidden flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-6 px-12 py-16"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Let's build something amazing together.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="col-span-1 md:col-span-2 rounded-full border border-gray-300 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FDB515]"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="rounded-full border border-gray-300 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FDB515]"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="rounded-full border border-gray-300 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FDB515]"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="col-span-1 md:col-span-2 rounded-3xl border border-gray-300 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FDB515]"
          />

          <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-6 gap-2">
            <Button
              type="submit"
              disabled={sending}
              className="rounded-full bg-[#FDB515] text-black px-12 py-6 text-lg font-semibold hover:scale-105 transition"
            >
              {sending ? "Sending..." : "Send Message"}
            </Button>
            {success && <p className="text-sm text-gray-700">{success}</p>}
          </div>
        </form>

        <div className="mt-12 text-center text-sm text-gray-500">
          Or reach us at <span className="font-semibold text-gray-700">hello@yourdomain.com</span>
        </div>
      </motion.div>
    </main>
  );
}
