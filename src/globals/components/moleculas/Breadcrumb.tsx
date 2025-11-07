"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  t: (key: string) => string;
  className?: string;
}

export default function Breadcrumb({ items, t, className = "" }: BreadcrumbProps) {
  return (
    <nav 
      className={`max-w-7xl mx-auto my-3 text-sm text-gris ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {/* Home icon */}
        <li className="flex items-center">
          <Link 
            href="/home" 
            className="flex items-center text-gris hover:text-gris-oscuro transition-colors"
            aria-label={t("common.home")}
          >
            <Home className="w-5 h-5" />
            <span className="sr-only">{t("common.home")}</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-5 h-5 text-gris mx-1" />
            {item.href && !item.isActive ? (
              <Link 
                href={item.href}
                className="text-gris hover:text-secundario transition-colors"
              >
                {item.label.toUpperCase()}
              </Link>
            ) : (
              <span 
                className={`text-md ${
                  item.isActive 
                    ? "font-semibold text-gris-oscuro" 
                    : "text-gris"
                }`}
                aria-current={item.isActive ? "page" : undefined}
              >
                {item.label.toUpperCase()}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
