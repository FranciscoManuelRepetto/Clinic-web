import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";
import NavButton from "./NavButton";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export default function Header({ 
  title, 
  showBackButton = false, 
  backButtonText,
  backButtonHref = "/" 
}: HeaderProps) {
  const { t, language, changeLanguage } = useTranslations();

  return (
    <div className="bg-[#d2f0e0] flex justify-between items-center px-8 py-2.5">
      <Link href="/Home" className="text-xl font-bold flex items-center gap-1 hover:opacity-80 transition-opacity">
        💚 {t('navbar.logo')}
      </Link>
      
      <ul className="flex gap-5 m-0 p-0 list-none">
        <NavButton 
          menuKey="historiaClinica"
          items={[
            { href: "/registrar-paciente", text: t('navbar.submenus.historiaClinica.crearPaciente') },
            { href: "#", text: t('navbar.submenus.historiaClinica.buscarPaciente') },
            { href: "#", text: t('navbar.submenus.historiaClinica.generarReporte') }
          ]}
        />
        
        <NavButton 
          menuKey="turnos"
          items={[
            { href: "#", text: t('navbar.submenus.turnos.gestionarTurnos') },
            { href: "#", text: t('navbar.submenus.turnos.calendario') }
          ]}
        />
        
        <NavButton 
          menuKey="medicamentos"
          items={[
            { href: "#", text: t('navbar.submenus.medicamentos.inventario') },
            { href: "#", text: t('navbar.submenus.medicamentos.recetas') }
          ]}
        />
        
        <NavButton 
          menuKey="personal"
          items={[
            { href: "#", text: t('navbar.submenus.personal.gestionarPersonal') },
            { href: "#", text: t('navbar.submenus.personal.horarios') }
          ]}
        />
      </ul>
      
      <div className="flex items-center gap-4">
        {/* Selector de idioma */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value as 'es' | 'en')}
            className="bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
          >
            <option value="es">🇪🇸 {t('language.spanish')}</option>
            <option value="en">🇺🇸 {t('language.english')}</option>
          </select>
        </div>
        
        {/* Título de la página o saludo del usuario */}
        <div className="flex items-center gap-4">
          {title && (
            <div className="text-lg font-semibold">
              {title}
            </div>
          )}
          
          {showBackButton && (
            <Link 
              href={backButtonHref}
              className="bg-white border border-gray-300 rounded px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {backButtonText || t('registerPatient.backToHome')}
            </Link>
          )}
          
          {!title && !showBackButton && (
            <div className="font-bold">{t('navbar.userGreeting')}</div>
          )}
        </div>
      </div>
    </div>
  );
}
