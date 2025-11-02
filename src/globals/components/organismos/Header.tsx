import NavButton from "../moleculas/NavButton";

interface HeaderProps {
  onLogout: () => void;
  t: (key: string) => string;
  language: string;
  changeLanguage: (lang: 'es' | 'en') => void;
}

export default function Header({
  onLogout,
  t,
  language,
  changeLanguage,
}: HeaderProps) {

  return (
    <div className="bg-[#88B497] flex items-center px-8 py-4">
      <ul className="flex gap-5 m-0 p-0 list-none justify-center w-full mt-4" role="navigation" aria-label="Main navigation">
        <NavButton
          menuKey="historiaClinica"
          items={[
            {
              href: "/registrar-paciente",
              text: t("navbar.submenus.historiaClinica.crearPaciente"),
            },
            {
              href: "/buscar-paciente",
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

        {/* Botón de logout */}
        <div className="flex items-center gap-4 text-gray-900">
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-bold h-12 w-30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            tabIndex={0}
          >
            {t("navbar.submenus.personal.cerrarSesion")}
          </button>
        </div>
      </div>
    </div>
  );
}
