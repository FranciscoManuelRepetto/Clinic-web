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
        className=" flex text-black font-medium px-3 py-2 hover:bg-[#c2f5d6] rounded transition-colors justify-center items-center"
      >
        {t(`navbar.menus.${menuKey}`)}
        <ChevronDown className="mr-4 w-4 h-4" />
      </button>
      {isOpen && (
        <ul className="absolute top-12 bg-[#d2f0e0] shadow-lg py-1.5 z-10 rounded">
          {items.map((item, index) => (
            <li key={index} className="w-40">
              {item.isExternal ? (
                <a 
                  href={item.href} 
                  className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              ) : (
                <Link 
                  href={item.href} 
                  className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors"
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
