"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import Breadcrumb from "@/components/Breadcrumb";

interface FormData {
  paciente: string;
  genero: string;
  yearInicio: string;
  yearFin: string;
  diagnostico: string;
  profesional: string;
  medicacion: string;
}

interface BuscarPacienteProps {
  t?: (key: string) => string;
  language?: string;
  changeLanguage?: (lang: 'es' | 'en') => void;
}

export default function BuscarPaciente({ t: propT, language: propLanguage, changeLanguage: propChangeLanguage }: BuscarPacienteProps) {
  const { t: hookT, language: hookLanguage, changeLanguage: hookChangeLanguage } = useTranslations();
  
  // Usar props si están disponibles, sino usar hook
  const t = propT || hookT;
  const language = propLanguage || hookLanguage;
  const changeLanguage = propChangeLanguage || hookChangeLanguage;
  const [showFilters, setShowFilters] = useState(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    paciente: "",
    genero: "",
    yearInicio: "",
    yearFin: "",
    diagnostico: "",
    profesional: "",
    medicacion: "",
  });

  const numericFields = ["yearInicio", "yearFin"];

  // 👉 Funciones para manipular el form desde el teclado virtual
  const insertText = (text: string) => {
    if (activeInput) {
      setFormData((prev) => ({
        ...prev,
        [activeInput]: prev[activeInput as keyof FormData] + text,
      }));
    }
  };

  const deleteText = () => {
    if (activeInput) {
      setFormData((prev) => ({
        ...prev,
        [activeInput]: prev[activeInput as keyof FormData].slice(0, -1),
      }));
    }
  };

  const clearField = () => {
    if (activeInput) {
      setFormData((prev) => ({
        ...prev,
        [activeInput]: "",
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (numericFields.includes(name) && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openKeyboardForField = (fieldName: string) => {
    setActiveInput(fieldName);
    setShowVirtualKeyboard(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Búsqueda realizada ✅");
  };

  // 📌 Ícono del teclado junto a cada input
  const KeyboardIcon = ({ fieldName }: { fieldName: string }) => (
    <button
      type="button"
      onClick={() => openKeyboardForField(fieldName)}
      className="ml-2 p-1 text-sm text-gray-500 hover:text-[#5fa6b4] focus:outline-none focus:ring-2 focus:ring-[#5fa6b4] rounded inline-flex items-center"
      aria-label={t("registerPatient.form.virtualKeyboard.openKeyboard")}
      title={t("registerPatient.form.virtualKeyboard.openKeyboard")}
    >
      ⌨️
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: t("navbar.menus.historiaClinica") },
          { label: t("searchPatient.title"), isActive: true }
        ]}
        t={t}
      />

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-6 py-3">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          {t("searchPatient.title")}
        </h1>
        <p className="text-gray-600 mb-6">{t("searchPatient.description")}</p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
        >
          {/* Campo principal */}
          <div>
            <label
              htmlFor="paciente"
              className="block text-sm font-medium text-gray-700"
            >
              {t("searchPatient.form.patient")}
            </label>
            <div className="mt-1 flex">
              <input
                id="paciente"
                name="paciente"
                type="text"
                value={formData.paciente}
                onChange={handleInputChange}
                placeholder={t("searchPatient.form.placeholders.search")}
                className="flex-1 border rounded-l-lg px-3 py-2 text-gray-900 
                           placeholder-gray-700 focus:outline-none 
                           focus:ring-2 focus:ring-green-600"
              />
              <KeyboardIcon fieldName="paciente" />
              <span className="bg-[#5fa6b4] text-white px-3 flex items-center rounded-r-lg">
                🔍
              </span>
            </div>
          </div>

          {/* Botón filtros avanzados */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 text-green-700 underline text-sm"
          >
            {showFilters
              ? t("searchPatient.form.hideFilters")
              : t("searchPatient.form.advancedFilters")}
          </button>

          {/* Filtros */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
              {/* Año ingreso */}
              <div>
                <label className="block text-sm font-medium text-black">
                  {t("searchPatient.form.yearOfAdmission")}
                </label>
                <div className="flex space-x-2 mt-1">
                  <input
                    type="text"
                    name="yearInicio"
                    value={formData.yearInicio}
                    onChange={handleInputChange}
                    placeholder={t("searchPatient.form.placeholders.year")}
                    className="w-1/2 border rounded-lg px-3 py-2 placeholder-gray-700"
                  />
                  <KeyboardIcon fieldName="yearInicio" />
                  <input
                    type="text"
                    name="yearFin"
                    value={formData.yearFin}
                    onChange={handleInputChange}
                    placeholder={t("searchPatient.form.placeholders.year")}
                    className="w-1/2 border rounded-lg px-3 py-2 placeholder-gray-700"
                  />
                  <KeyboardIcon fieldName="yearFin" />
                </div>
              </div>

              {/* Diagnóstico */}
              <div>
                <label className="block text-sm font-medium text-black">
                  {t("searchPatient.form.diagnosis")}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="diagnostico"
                    value={formData.diagnostico}
                    onChange={handleInputChange}
                    placeholder={t("searchPatient.form.placeholders.diagnosis")}
                    className="mt-1 w-full border rounded-lg px-3 py-2 placeholder-gray-700"
                  />
                  <KeyboardIcon fieldName="diagnostico" />
                </div>
              </div>

              {/* Profesional */}
              <div>
                <label className="block text-sm font-medium text-black">
                  {t("searchPatient.form.professional")}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="profesional"
                    value={formData.profesional}
                    onChange={handleInputChange}
                    placeholder={t(
                      "searchPatient.form.placeholders.professional"
                    )}
                    className="mt-1 w-full border rounded-lg px-3 py-2 placeholder-gray-700"
                  />
                  <KeyboardIcon fieldName="profesional" />
                </div>
              </div>

              {/* Medicación */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black">
                  {t("searchPatient.form.medication")}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="medicacion"
                    value={formData.medicacion}
                    onChange={handleInputChange}
                    placeholder={t(
                      "searchPatient.form.placeholders.medication"
                    )}
                    className="mt-1 w-full border rounded-lg px-3 py-2 placeholder-gray-700"
                  />
                  <KeyboardIcon fieldName="medicacion" />
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 
                     transition-all duration-200 focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-gray-600"
            >
              {t("common.back", )}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg flex items-center transition-all duration-200 
                     bg-[#5fa6b4] text-white hover:bg-[#5fa6b4]/80 
                     focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-[#5fa6b4]"
            >
              {t("searchPatient.form.searchButton")} <span className="ml-2">🔍</span>
            </button>
          </div>
        </form>
      </main>

      {/* 📌 Render del teclado virtual */}
      <VirtualKeyboard
        showKeyboard={showVirtualKeyboard}
        setShowKeyboard={setShowVirtualKeyboard}
        activeInput={activeInput}
        isNumericField={activeInput ? numericFields.includes(activeInput) : false}
        onInsertText={insertText}
        onDeleteText={deleteText}
        onClearField={clearField}
      />
    </div>
  );
}
