"use client";

import { useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t, language, changeLanguage, isSpanish, isEnglish } = useTranslations();

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Barra superior */}
      <div className="bg-[#d2f0e0] flex justify-between items-center px-8 py-2.5">
        <div className="text-xl font-bold flex items-center gap-1">
          💚 {t('navbar.logo')}
        </div>
        
        <ul className="flex gap-5 m-0 p-0 list-none">
          <li className="relative">
            <button
              onClick={() => toggleDropdown('historia')}
              className="text-black font-medium px-3 py-2 hover:bg-[#c2f5d6] rounded transition-colors"
            >
{t('navbar.menus.historiaClinica')}
            </button>
            {activeDropdown === 'historia' && (
              <ul className="absolute top-9 left-0 bg-[#f4fff9] shadow-lg py-1.5 z-10 rounded">
                <li className="w-40">
                  <Link href="/registrar-paciente" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.historiaClinica.crearPaciente')}
                  </Link>
                </li>
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.historiaClinica.buscarPaciente')}
                  </a>
                </li>
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.historiaClinica.generarReporte')}
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          <li className="relative">
            <button
              onClick={() => toggleDropdown('turnos')}
              className="text-black font-medium px-3 py-2 hover:bg-[#c2f5d6] rounded transition-colors"
            >
{t('navbar.menus.turnos')}
            </button>
            {activeDropdown === 'turnos' && (
              <ul className="absolute top-9 left-0 bg-[#f4fff9] shadow-lg py-1.5 z-10 rounded">
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.turnos.gestionarTurnos')}
                  </a>
                </li>
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.turnos.calendario')}
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          <li className="relative">
            <button
              onClick={() => toggleDropdown('medicamentos')}
              className="text-black font-medium px-3 py-2 hover:bg-[#c2f5d6] rounded transition-colors"
            >
{t('navbar.menus.medicamentos')}
            </button>
            {activeDropdown === 'medicamentos' && (
              <ul className="absolute top-9 left-0 bg-[#f4fff9] shadow-lg py-1.5 z-10 rounded">
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.medicamentos.inventario')}
                  </a>
                </li>
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.medicamentos.recetas')}
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          <li className="relative">
            <button
              onClick={() => toggleDropdown('personal')}
              className="text-black font-medium px-3 py-2 hover:bg-[#c2f5d6] rounded transition-colors"
            >
{t('navbar.menus.personal')}
            </button>
            {activeDropdown === 'personal' && (
              <ul className="absolute top-9 left-0 bg-[#f4fff9] shadow-lg py-1.5 z-10 rounded">
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.personal.gestionarPersonal')}
                  </a>
                </li>
                <li className="w-40">
                  <a href="#" className="block px-2.5 py-2.5 text-black hover:bg-[#e6f2ff] transition-colors">
                    {t('navbar.submenus.personal.horarios')}
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
        
        <div className="flex items-center gap-4">
          {/* Selector de idioma */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value as 'es' | 'en')}
              className="bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#a4eac3]"
            >
              <option value="es">🇪🇸 {t('language.spanish')}</option>
              <option value="en">🇺🇸 {t('language.english')}</option>
            </select>
          </div>
          
          <div className="font-bold">{t('navbar.userGreeting')}</div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-8">
        <h2 className="mb-5 text-2xl font-semibold">{t('content.welcome')}</h2>
        <div className="bg-[#e6f2ff] inline-block px-3.5 py-2 rounded-lg font-bold shadow-md">
          {t('content.date')}
        </div>
        <table className="mt-4 border border-black border-collapse w-[70%]">
          <tbody>
            <tr className="h-12 bg-[#a4eac3]">
              <td className="border border-black"></td>
            </tr>
            <tr className="h-12 bg-[#c2f5d6]">
              <td className="border border-black"></td>
            </tr>
            <tr className="h-12 bg-[#a4eac3]">
              <td className="border border-black"></td>
            </tr>
            <tr className="h-12 bg-[#c2f5d6]">
              <td className="border border-black"></td>
            </tr>
            <tr className="h-12 bg-[#a4eac3]">
              <td className="border border-black"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
