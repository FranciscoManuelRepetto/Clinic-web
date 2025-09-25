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
    <div className="bg-[#d2f0e0] flex  items-center px-8 py-4">
      <Link
        href="/home"
        className="text-xl text-black font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        💚 {t("navbar.logo")}
      </Link>

      <ul className="flex gap-5 m-0 p-0 list-none justify-center w-full mt-4">
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
            className="h-12 w-30 text-center bg-white border text-gray-900 border-gray-900 rounded px-3 py-1 text-sm font-bold "
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
              className="bg-white border border-gray-300 rounded px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {backButtonText || t("registerPatient.backToHome")}
            </Link>
          )}


          {/* Botón de logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-red-600  text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-bold h-12 w-30"
            >
              {t("navbar.submenus.personal.cerrarSesion")}
            </button>
          )}
        </div>
      </div>

 <div className="dropdown-content hidden group-hover:block absolute bg-white mt-1 py-2 w-48 rounded-md shadow-lg z-50">
    <Link
      href="/registrar-paciente"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                 hover:outline hover:outline-2 hover:outline-black 
                 focus:outline focus:outline-2 focus:outline-black rounded"
    >
      {t("navbar.menus.historiaClinica.registrarPaciente")}
    </Link>
    <Link
      href="/buscar-paciente"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                 hover:outline hover:outline-2 hover:outline-black 
                 focus:outline focus:outline-2 focus:outline-black rounded"
    >
      {t("navbar.menus.historiaClinica.buscarPaciente")}
    </Link>
  </div>
</div>
  );
}
