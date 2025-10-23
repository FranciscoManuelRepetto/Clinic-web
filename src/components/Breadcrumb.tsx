"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  t: (key: string) => string;
  className?: string;
}

export default function Breadcrumb({ items, t, className = "" }: BreadcrumbProps) {
  return (
    <nav 
      className={`max-w-7xl mx-auto px-6 py-3 text-lg text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {/* Home icon */}
        <li className="flex items-center">
          <Link 
            href="/home" 
            className="flex items-center text-gray-500 hover:text-[#5fa6b4] transition-colors"
            aria-label={t("common.home")}
          >
            <Home className="w-8 h-8" />
            <span className="sr-only">{t("common.home")}</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-8 h-8 text-gray-400 mx-1" />
            {item.href && !item.isActive ? (
              <Link 
                href={item.href}
                className="text-gray-600 hover:text-[#5fa6b4] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={`text-md ${
                  item.isActive 
                    ? "font-semibold text-[#5fa6b4]" 
                    : "text-gray-600"
                }`}
                aria-current={item.isActive ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
