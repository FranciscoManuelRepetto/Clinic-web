"use client";

import { useTranslations } from "@/hooks/useTranslations";
import Header from "@/components/Header";

export default function Home() {
  const { t } = useTranslations();

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />

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