import Link from "next/link";
import NavButton from "./NavButton";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  onLogout?: () => void;
  t: (key: string) => string;
  language: string;
  changeLanguage: (lang: 'es' | 'en') => void;
}

export default function Header({
  title,
  showBackButton = false,
  backButtonText,
  backButtonHref = "/",
  onLogout,
  t,
  language,
  changeLanguage,
}: HeaderProps) {

  return (
    <div className="bg-[#88B497] flex  items-center px-8 py-4">

      <ul className="flex gap-5 m-0 p-0 list-none justify-center w-full mt-4" role="menubar">
        <NavButton
          menuKey="historiaClinica"
          items={[
            {
              href: "/registrar-paciente",
              text: t("navbar.submenus.historiaClinica.crearPaciente"),
              
            },
            {
              href: "/buscar-paciente", // Actualizar esta URL
              text: t("navbar.submenus.historiaClinica.buscarPaciente"),
            },
            {
              href: "#",
              text: t("navbar.submenus.historiaClinica.generarReporte"),
            },
          ]}
        />

        <NavButton
          menuKey="turnos"
          items={[
            { href: "#", text: t("navbar.submenus.turnos.gestionarTurnos") },
            { href: "#", text: t("navbar.submenus.turnos.calendario") },
          ]}
        />

        <NavButton
          menuKey="medicamentos"
          items={[
            { href: "#", text: t("navbar.submenus.medicamentos.inventario") },
            { href: "#", text: t("navbar.submenus.medicamentos.recetas") },
          ]}
        />

        <NavButton
          menuKey="personal"
          items={[
            {
              href: "#",
              text: t("navbar.submenus.personal.gestionarPersonal"),
            },
            { href: "#", text: t("navbar.submenus.personal.horarios") },
          ]}
        />
      </ul>

      <div className="flex items-center gap-4 mt-4">
        {/* Selector de idioma */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value as "es" | "en")}
            className="h-12 w-30 text-center bg-white border text-gray-900 border-gray-900 rounded px-3 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#5fa6b4] focus:ring-offset-2"
            tabIndex={0}
          >
            <option value="es" className="text-center">🇪🇸 {t("language.spanish")}</option>
            <option value="en" className="text-center">🇺🇸 {t("language.english")}</option>
          </select>
        </div>

        {/* Título de la página o saludo del usuario */}
        <div className="flex items-center gap-4 text-gray-900">
          {title && <div className="text-lg font-semibold">{title}</div>}

          {showBackButton && (
            <Link
              href={backButtonHref}
              className="bg-white border border-gray-300 rounded px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5fa6b4] focus:ring-offset-2"
              tabIndex={0}
            >
              {backButtonText || t("registerPatient.backToHome")}
            </Link>
          )}


          {/* Botón de logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-bold h-12 w-30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              tabIndex={0}
            >
              {t("navbar.submenus.personal.cerrarSesion")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
