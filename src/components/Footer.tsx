// components/Footer.tsx
"use client";

import { useTranslations } from "@/hooks/useTranslations";

export default function Footer() {
  const { t } = useTranslations();

  return (
    <footer className="bg-green-200 text-gray-500 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm">
        &copy; {new Date().getFullYear()} All rights reserved — Employee Portal
      </div>
    </footer>
  );
}
