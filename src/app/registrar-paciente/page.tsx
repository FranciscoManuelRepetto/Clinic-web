"use client";

import { useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Header from "@/components/Header";
import Link from "next/link";

export default function RegistrarPaciente() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    fechaNacimiento: "",
    telefono: "",
    email: "",
    direccion: "",
    genero: "",
    tipoSangre: "",
    alergias: "",
    medicamentos: "",
    antecedentes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se procesaría el envío del formulario
    console.log("Datos del paciente:", formData);
    alert(t('registerPatient.form.successMessage'));
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header 
        title={t('registerPatient.title')}
        showBackButton={true}
        backButtonText={t('registerPatient.backToHome')}
        backButtonHref="/"
      />

      {/* Contenido */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t('registerPatient.form.title')}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {t('registerPatient.form.sections.personalInfo')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.firstName')} *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.firstName')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.lastName')} *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.lastName')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.document')} *
                  </label>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.document')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.birthDate')} *
                  </label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.phone')}
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.phone')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.email')}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.address')}
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.address')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.gender')}
                  </label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                  >
                    <option value="">{t('registerPatient.form.placeholders.selectGender')}</option>
                    <option value="masculino">{t('registerPatient.form.options.male')}</option>
                    <option value="femenino">{t('registerPatient.form.options.female')}</option>
                    <option value="otro">{t('registerPatient.form.options.other')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.bloodType')}
                  </label>
                  <select
                    name="tipoSangre"
                    value={formData.tipoSangre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                  >
                    <option value="">{t('registerPatient.form.placeholders.selectBloodType')}</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Información Médica */}
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {t('registerPatient.form.sections.medicalInfo')}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.allergies')}
                  </label>
                  <textarea
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.allergies')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.medications')}
                  </label>
                  <textarea
                    name="medicamentos"
                    value={formData.medicamentos}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.medications')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registerPatient.form.fields.medicalHistory')}
                  </label>
                  <textarea
                    name="antecedentes"
                    value={formData.antecedentes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] focus:border-transparent"
                    placeholder={t('registerPatient.form.placeholders.medicalHistory')}
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6">
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                {t('registerPatient.form.buttons.cancel')}
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-[#a4eac3] text-white rounded-md hover:bg-[#8dd4b0] transition-colors font-medium"
              >
                {t('registerPatient.form.buttons.register')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
