import { useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";
import { ChevronDown } from 'lucide-react';
interface NavItem {
  href: string;
  text: string;
  isExternal?: boolean;
}

interface NavButtonProps {
  menuKey: string;
  items: NavItem[];
}

export default function NavButton({ menuKey, items }: NavButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslations();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <li className="relative">
      <button
        onClick={toggleDropdown}
        onBlur={() => setTimeout(closeDropdown, 150)} 
        className=" flex text-black font-bold px-3 py-2 hover:bg-[#4a6b59] hover:text-[#FFFFFF] rounded transition-colors justify-center items-center"
      >
        {t(`navbar.menus.${menuKey}`)}
        <ChevronDown className="mr-4 w-4 h-4" />
      </button>
      {isOpen && (
        <ul className="absolute top-10 bg-[#4a6b59]  text-white shadow-lg py-1.5 z-10 rounded">
          {items.map((item, index) => (
            <li key={index} className="w-40">
              {item.isExternal ? (
                <a 
                  href={item.href} 
                  className="block px-2.5 py-2.5 text-white hover:bg-[#4a6b59] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              ) : (
                <Link 
                  href={item.href} 
                  className="block px-2.5 py-2.5 text-white hover:bg-[#795C34] transition-colors"
                >
                  {item.text}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
