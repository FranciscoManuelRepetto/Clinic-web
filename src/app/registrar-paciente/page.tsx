"use client";

import { useState, useEffect } from "react";
// Asumo que tienes estos componentes y hooks
// import { useTranslations } from "@/hooks/useTranslations";
// import Header from "@/components/Header";

// --- Mock de useTranslations para que el componente sea autoejecutable ---
const useTranslations = () => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      'registerPatient.title': 'Registrar Paciente',
      'registerPatient.backToHome': 'Volver al Inicio',
      'registerPatient.form.title': 'Formulario de Registro de Paciente',
      // Agrega aquí más traducciones si las necesitas para los campos
    };
    return translations[key] || key;
  }
});

// --- Mock del Header para que el componente sea autoejecutable ---
// Se reemplaza <Link> por <a> para evitar errores de compilación fuera de un entorno Next.js
const Header = ({ title, showBackButton, backButtonText, backButtonHref }: {
  title: string;
  showBackButton: boolean;
  backButtonText: string;
  backButtonHref: string;
}) => (
  <header className="bg-white shadow-md p-4 flex items-center">
    {showBackButton && (
      <a href={backButtonHref} className="text-blue-600 hover:underline mr-4">
        &larr; {backButtonText}
      </a>
    )}
    <h1 className="text-xl font-bold text-gray-800">{title}</h1>
  </header>
);
// --- Fin de los Mocks ---


interface FormData {
  dni: string;
  fechaIngreso: string;
  genero: string;
  nombres: string;
  apellido: string;
  obraSocial: string;
  nroSocio: string;
  calle: string;
  numero: string;
  piso: string;
  dpto: string;
  telefono: string;
  email: string;
  fotoPerfil: File | null;
}

export default function RegistrarPaciente() {
  const { t } = useTranslations();
  
  // Estado inicial alineado con el wireframe y con nombres de clave válidos
  const [formData, setFormData] = useState({
    dni: "",
    fechaIngreso: new Date().toISOString().slice(0, 10), // Fecha de hoy por defecto
    genero: "",
    nombres: "",
    apellido: "",
    obraSocial: "",
    nroSocio: "",
    calle: "",
    numero: "",
    piso: "",
    dpto: "",
    telefono: "",
    email: "",
    fotoPerfil: null,
  });
  
  const [showModal, setShowModal] = useState(false);
  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set());
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [isUpperCase, setIsUpperCase] = useState(false); // Agregar este estado al inicio del componente
  const [validationErrors, setValidationErrors] = useState<string[]>([]); // Agregar este estado para manejar los mensajes de error
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'error' | 'success';
  }>({
    show: false,
    message: '',
    type: 'error'
  }); // Agregar este estado para la notificación

  // Agregar esta constante al inicio del componente
  const numericFields = ['dni', 'nroSocio', 'telefono', 'numero', 'piso'];

  // Función para manejar el focus en los inputs
  const handleInputFocus = (fieldName: string) => {
    setFocusedFields(prev => new Set(prev).add(fieldName));
    setActiveInput(fieldName);
    // No abrir automáticamente el teclado virtual
  };

  // Función para manejar el blur de los inputs
  const handleInputBlur = () => {
    setActiveInput(null);
    // Mantener el teclado abierto por un momento para facilitar la navegación
    setTimeout(() => {
      if (!document.activeElement || !document.activeElement.matches('input, select, button')) {
        setShowVirtualKeyboard(false);
      }
    }, 1000);
  };

  // Función para insertar texto desde el teclado virtual
  const insertText = (text: string) => {
    if (activeInput) {
      setFormData(prev => ({
        ...prev,
        [activeInput]: prev[activeInput as keyof FormData] + text
      }));
    }
  };

  // Función para borrar texto
  const deleteText = () => {
    if (activeInput) {
      setFormData(prev => ({
        ...prev,
        [activeInput]: (prev[activeInput as keyof FormData] as string).slice(0, -1)
      }));
    }
  };

  // Función para limpiar el campo
  const clearField = () => {
    if (activeInput) {
      setFormData(prev => ({
        ...prev,
        [activeInput]: ""
      }));
    }
  };

  // Función para navegación por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const inputs = document.querySelectorAll('input, select, button[tabindex]');
    const currentIndex = Array.from(inputs).indexOf(e.target as Element);
    
    switch (e.key) {
      case 'Tab':
        // Navegación normal con Tab
        break;
      case 'Enter':
        e.preventDefault();
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
          // Ir al siguiente campo
          const nextInput = inputs[currentIndex + 1] as HTMLElement;
          if (nextInput) {
            nextInput.focus();
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextInputDown = inputs[currentIndex + 1] as HTMLElement;
        if (nextInputDown) {
          nextInputDown.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevInputUp = inputs[currentIndex - 1] as HTMLElement;
        if (prevInputUp) {
          prevInputUp.focus();
        }
        break;
      case 'Escape':
        // Cerrar teclado virtual
        setShowVirtualKeyboard(false);
        setActiveInput(null);
        break;
    }
  };

  // Función para activar el teclado virtual con tecla específica
  const handleVirtualKeyboardToggle = (e: React.KeyboardEvent) => {
    if (e.key === 'F1' || (e.ctrlKey && e.key === 'k')) {
      e.preventDefault();
      setShowVirtualKeyboard(!showVirtualKeyboard);
    }
  };

  // Función para abrir teclado virtual para un campo específico
  const openKeyboardForField = (fieldName: string) => {
    setActiveInput(fieldName);
    setShowVirtualKeyboard(true);
  };

  // Componente de ícono de teclado
  const KeyboardIcon = ({ fieldName }: { fieldName: string }) => (
    <button
      type="button"
      onClick={() => openKeyboardForField(fieldName)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openKeyboardForField(fieldName);
        }
      }}
      className="ml-2 p-1 text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded inline-flex items-center"
      aria-label={`Abrir teclado virtual para ${fieldName}`}
      title="Abrir teclado virtual"
    >
      ⌨️
    </button>
  );

  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).files?.[0] || null
      }));
    } else if (numericFields.includes(name)) {
      // Solo permitir números en campos numéricos
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Lista de campos requeridos con sus nombres amigables
    const requiredFields: { key: keyof FormData; label: string }[] = [
      { key: 'dni', label: 'DNI' },
      { key: 'nombres', label: 'Nombre' },
      { key: 'apellido', label: 'Apellido' },
      { key: 'genero', label: 'Género' },
      { key: 'obraSocial', label: 'Obra Social' },
      { key: 'nroSocio', label: 'Número de Socio' }
    ];
    
    // Verificar campos vacíos
    const missingFields = requiredFields.filter(field => !formData[field.key]);
    
    if (missingFields.length > 0) {
      // Crear mensajes de error específicos
      const errors = missingFields.map(field => `El campo ${field.label} es obligatorio`);
      setValidationErrors(errors);
      
      // Mostrar alerta con los campos faltantes
      const errorMessage = `Por favor complete los siguientes campos obligatorios:\n\n${errors.join('\n')}`;
      alert(errorMessage);
      
      // Enfocar el primer campo faltante
      const firstMissingField = document.getElementById(missingFields[0].key);
      if (firstMissingField) {
        firstMissingField.focus();
      }
      
      return;
    }
    
    // Si todos los campos requeridos están completos, limpiar errores y mostrar modal de confirmación
    setValidationErrors([]);
    setShowModal(true);
  };
  
  const handleConfirmarGuardado = () => {
    console.log("Datos del paciente:", formData);
    // Aquí iría la lógica para enviar los datos al backend
    setNotification({ show: true, message: 'Paciente guardado exitosamente.', type: 'success' });
    setShowModal(false);
    // Opcional: limpiar el formulario o redirigir
  };

  const handleKeyboardNavigation = (isShiftKey: boolean) => {
    const buttons = document.querySelectorAll('[data-keyboard-button="true"]');
    const currentElement = document.activeElement;
    const currentIndex = Array.from(buttons).indexOf(currentElement as Element);
    
    let nextIndex;
    if (isShiftKey) {
      // Navegación hacia atrás
      nextIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
    } else {
      // Navegación hacia adelante
      nextIndex = currentIndex >= buttons.length - 1 ? 0 : currentIndex + 1;
    }
    
    (buttons[nextIndex] as HTMLElement).focus();
  };

  // Agregar este useEffect para manejar el foco inicial
  useEffect(() => {
    if (showVirtualKeyboard) {
      const firstButton = document.querySelector('[data-keyboard-button="true"]') as HTMLElement;
      if (firstButton) {
        firstButton.focus();
      }
    }
  }, [showVirtualKeyboard]);

  return (
    <>
      <div 
        className="font-sans bg-gray-50 min-h-screen"
        onKeyDown={handleKeyDown}
        onKeyUp={handleVirtualKeyboardToggle}
        tabIndex={-1}
      >
        <Header 
          title={t('registerPatient.title')}
          showBackButton={true}
          backButtonText={t('registerPatient.backToHome')}
          backButtonHref="javascript:history.back()"
        />

        <main className="p-4 sm:p-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
              {t('registerPatient.form.title')}
            </h1>
            
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna de Imagen de Perfil */}
                <div className="flex flex-col items-center">
                  <label htmlFor="fotoPerfil" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                    Foto de Perfil
                  </label>
                  <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
                    <span className="text-center text-sm">Ingresar</span>
                  </div>
                  {/* El input real está oculto pero es accesible vía la etiqueta */}
                  <input type="file" id="fotoPerfil" name="fotoPerfil" className="sr-only" onChange={handleInputChange} accept="image/*"/>
                  
                  {/* Fecha de Ingreso debajo de la imagen */}
                  <div className="mt-6 w-full">
                    <div className="flex items-center mb-1">
                      <label htmlFor="fechaIngreso" className="block text-sm font-medium text-gray-700 uppercase">
                        FECHA DE INGRESO <span className="text-red-500">*</span>
                      </label>
                      <KeyboardIcon fieldName="fechaIngreso" />
                    </div>
                    <input 
                      id="fechaIngreso" 
                      name="fechaIngreso" 
                      type="date" 
                      value={formData.fechaIngreso} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                    />
                    <p className="text-xs text-red-500 mt-1">Campo obligatorio</p>
                  </div>
                </div>
                
                {/* Columna principal de datos */}
                <div className="lg:col-span-2 space-y-6">
                   <fieldset className="border border-gray-200 p-4 rounded-md">
                      <legend className="text-lg font-semibold text-gray-700 px-2">Datos Personales</legend>
                      <div className="space-y-4 mt-4">
                        {/* Primera fila: DNI solo pero con ancho limitado */}
                        <div className="flex justify-start">
                          <div className="w-full md:w-1/2">
                            <div className="flex items-center mb-1">
                              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 uppercase">
                                DNI <span className="text-red-500">*</span>
                              </label>
                              <KeyboardIcon fieldName="dni" />
                            </div>
                            <input 
                              id="dni" 
                              name="dni" 
                              type="text" 
                              value={formData.dni} 
                              onChange={handleInputChange} 
                              onFocus={() => handleInputFocus('dni')}
                              onBlur={handleInputBlur}
                              required 
                              className={`w-full px-3 py-2 border ${
                                validationErrors.includes('El campo DNI es obligatorio') 
                                  ? 'border-red-500 ring-1 ring-red-500' 
                                  : 'border-gray-300'
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black`}
                              placeholder={focusedFields.has('dni') ? "" : "Ingrese aquí su DNI"}
                              aria-describedby="dni-error"
                            />
                            {validationErrors.includes('El campo DNI es obligatorio') && (
                              <p id="dni-error" className="text-red-500 text-sm mt-1">
                                El campo DNI es obligatorio
                              </p>
                            )}
                            <p className="text-xs text-red-500 mt-1">Campo obligatorio</p>
                            <p className="text-xs text-blue-600 mt-1 flex items-center">
                              <span className="mr-1">ℹ️</span> Ingrese solo números, sin puntos ni comas
                            </p>
                          </div>
                        </div>

                        {/* Segunda fila: Nombres y Apellido juntos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center mb-1">
                              <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 uppercase">
                                NOMBRE/S <span className="text-red-500">*</span>
                              </label>
                              <KeyboardIcon fieldName="nombres" />
                            </div>
                            <input 
                              id="nombres" 
                              name="nombres" 
                              type="text" 
                              value={formData.nombres} 
                              onChange={handleInputChange} 
                              onFocus={() => handleInputFocus('nombres')}
                              onBlur={handleInputBlur}
                              required 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                              placeholder={focusedFields.has('nombres') ? "" : "Ingrese aquí su nombre"}
                            />
                            <p className="text-xs text-red-500 mt-1">Campo obligatorio</p>
                            <p className="text-xs text-blue-600 mt-1 flex items-center">
                              <span className="mr-1">ℹ️</span> Ingrese solo letras
                            </p>
                          </div>
                          <div>
                            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                              APELLIDO <span className="text-red-500">*</span>
                              <KeyboardIcon fieldName="apellido" />
                            </label>
                            <input 
                              id="apellido" 
                              name="apellido" 
                              type="text" 
                              value={formData.apellido} 
                              onChange={handleInputChange} 
                              onFocus={() => handleInputFocus('apellido')}
                              required 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                              placeholder={focusedFields.has('apellido') ? "" : "Ingrese aquí su apellido"} 
                            />
                            <p className="text-xs text-red-500 mt-1">Campo obligatorio</p>
                            <p className="text-xs text-blue-600 mt-1 flex items-center">
                              <span className="mr-1">ℹ️</span> Ingrese solo letras
                            </p>
                          </div>
                        </div>

                        {/* Tercera fila: Género solo pero con ancho limitado */}
                        <div className="flex justify-start">
                          <div className="w-full md:w-1/2">
                            <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                              GÉNERO <span className="text-red-500">*</span>
                            </label>
                            <select 
                              id="genero" 
                              name="genero" 
                              value={formData.genero} 
                              onChange={handleInputChange} 
                              onFocus={() => handleInputFocus('genero')}
                              required 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black"
                            >
                              <option value="">{focusedFields.has('genero') ? "Seleccione una opción" : "Seleccione aquí su género"}</option>
                              <option value="masculino">Masculino</option>
                              <option value="femenino">Femenino</option>
                              <option value="otro">Otro</option>
                            </select>
                            <p className="text-xs text-red-500 mt-1">Campo obligatorio</p>
                          </div>
                        </div>

                        {/* Cuarta fila: Obra Social y Nro Socio juntos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="obraSocial" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                              OBRA SOCIAL <span className="text-red-500">*</span>
                              <KeyboardIcon fieldName="obraSocial" />
                            </label>
                            <input 
                              id="obraSocial" 
                              name="obraSocial" 
                              type="text" 
                              value={formData.obraSocial} 
                              onChange={handleInputChange} 
                              onFocus={() => handleInputFocus('obraSocial')}
                              required 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                              placeholder={focusedFields.has('obraSocial') ? "" : "Ingrese aquí su obra social"} 
                            />
                            <p className="text-xs text-red-500 mt-1">Campo obligatorio</p>
                            <p className="text-xs text-blue-600 mt-1 flex items-center">
                              <span className="mr-1">ℹ️</span> Ingrese solo letras
                            </p>
                          </div>
                          <div>
                            <label htmlFor="nroSocio" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                              NRO SOCIO <span className="text-red-500">*</span>
                              <KeyboardIcon fieldName="nroSocio" />
                            </label>
                            <input 
                              id="nroSocio" 
                              name="nroSocio" 
                              type="text" 
                              value={formData.nroSocio} 
                              onChange={handleInputChange} 
                              onFocus={() => handleInputFocus('nroSocio')}
                              required 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                              placeholder={focusedFields.has('nroSocio') ? "" : "Ingrese aquí su número de socio"} 
                            />
                            <p className="text-xs text-red-500 mt-1">Campo obligatorio</p>
                            <p className="text-xs text-blue-600 mt-1 flex items-center">
                              <span className="mr-1">ℹ️</span> Ingrese solo números
                            </p>
                          </div>
                        </div>
                      </div>
                   </fieldset>
                   
                   <fieldset className="border border-gray-200 p-4 rounded-md">
                      <legend className="text-lg font-semibold text-gray-700 px-2">Datos de Contacto</legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Domicilio */}
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                {/* Calle */}
                                <div className="sm:col-span-6">
                                    <label htmlFor="calle" className="block text-sm font-medium text-gray-700 mb-1">
                                        CALLE
                                        <KeyboardIcon fieldName="calle" />
                                    </label>
                                    <input 
                                        id="calle"
                                        type="text" 
                                        name="calle" 
                                        placeholder={focusedFields.has('calle') ? "" : "Ingrese aquí su calle"} 
                                        onChange={handleInputChange} 
                                        onFocus={() => handleInputFocus('calle')}
                                        value={formData.calle} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                                    />
                                </div>

                                {/* Número */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
                                        NUM
                                        <KeyboardIcon fieldName="numero" />
                                    </label>
                                    <input 
                                        id="numero"
                                        type="text" 
                                        name="numero" 
                                        placeholder={focusedFields.has('numero') ? "" : "Nro"} 
                                        onChange={handleInputChange} 
                                        onFocus={() => handleInputFocus('numero')}
                                        value={formData.numero} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                                    />
                                </div>

                                {/* Piso */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="piso" className="block text-sm font-medium text-gray-700 mb-1">
                                        PISO
                                        <KeyboardIcon fieldName="piso" />
                                    </label>
                                    <input 
                                        id="piso"
                                        type="text" 
                                        name="piso" 
                                        placeholder={focusedFields.has('piso') ? "" : "Piso"} 
                                        onChange={handleInputChange} 
                                        onFocus={() => handleInputFocus('piso')}
                                        value={formData.piso} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                                    />
                                </div>

                                {/* Departamento */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="dpto" className="block text-sm font-medium text-gray-700 mb-1">
                                        DPTO
                                        <KeyboardIcon fieldName="dpto" />
                                    </label>
                                    <input 
                                        id="dpto"
                                        type="text" 
                                        name="dpto" 
                                        placeholder={focusedFields.has('dpto') ? "" : "Dpto"} 
                                        onChange={handleInputChange} 
                                        onFocus={() => handleInputFocus('dpto')}
                                        value={formData.dpto} 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Opcional</p>
                        </div>
                        {/* Teléfono */}
                        <div>
                          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                            TELÉFONO
                            <KeyboardIcon fieldName="telefono" />
                          </label>
                          <input 
                            id="telefono" 
                            name="telefono" 
                            type="tel" 
                            value={formData.telefono} 
                            onChange={handleInputChange} 
                            onFocus={() => handleInputFocus('telefono')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                            placeholder={focusedFields.has('telefono') ? "" : "Ingrese aquí su teléfono"} 
                          />
                          <p className="text-xs text-gray-500 mt-1">Opcional</p>
                        </div>
                        {/* Email - Último campo del formulario */}
                        <div>
                          <div className="flex items-center mb-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 uppercase">
                              EMAIL
                            </label>
                            <KeyboardIcon fieldName="email" />
                          </div>
                          <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            onFocus={() => handleInputFocus('email')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a4eac3] bg-white text-black" 
                            placeholder={focusedFields.has('email') ? "" : "Ingrese aquí su email"} 
                          />
                          <p className="text-xs text-gray-500 mt-1">Opcional</p>
                        </div>
                      </div>
                   </fieldset>
                </div>
              </div>
              
              {/* Botones de acción - Los movemos dentro del form y quitamos cualquier tabIndex específico */}
              <div className="flex justify-end space-x-4 pt-8">
                <button 
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-[#69b594] text-white rounded-md hover:bg-[#5aa382] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#69b594]"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Teclado Virtual */}
      {showVirtualKeyboard && (
        <div 
          className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-lg z-40 p-4"
          role="dialog"
          aria-label="Teclado Virtual"
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              handleKeyboardNavigation(e.shiftKey);
            }
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header del teclado virtual */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Teclado Virtual - {activeInput?.toUpperCase()}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setShowVirtualKeyboard(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowVirtualKeyboard(false);
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
                  aria-label="Guardar y cerrar teclado virtual"
                  data-keyboard-button="true"
                >
                  Guardar
                </button>
                <button 
                  onClick={() => setShowVirtualKeyboard(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setShowVirtualKeyboard(false);
                    }
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
                  aria-label="Cerrar teclado virtual sin guardar"
                  data-keyboard-button="true"
                >
                  Cerrar
                </button>
              </div>
            </div>

            {activeInput && numericFields.includes(activeInput) ? (
              // Teclado numérico
              <div className="grid grid-cols-3 gap-2 mb-4" role="grid">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
                  <button
                    key={num}
                    onClick={() => insertText(num)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        insertText(num);
                      }
                    }}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    aria-label={`Insertar número ${num}`}
                    data-keyboard-button="true"
                  >
                    {num}
                  </button>
                ))}
              </div>
            ) : (
              // Teclado alfabético (el resto del código del teclado alfabético se mantiene igual)
              <>
                {/* Primera fila de letras */}
                <div className="grid grid-cols-10 gap-2 mb-2">
                  {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => insertText(isUpperCase ? letter : letter.toLowerCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          insertText(isUpperCase ? letter : letter.toLowerCase());
                        }
                      }}
                      className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      aria-label={`Insertar letra ${letter}`}
                      data-keyboard-button="true"
                    >
                      {isUpperCase ? letter : letter.toLowerCase()}
                    </button>
                  ))}
                </div>

                {/* Segunda fila de letras */}
                <div className="grid grid-cols-10 gap-2 mb-2">
                  {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => insertText(isUpperCase ? letter : letter.toLowerCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          insertText(isUpperCase ? letter : letter.toLowerCase());
                        }
                      }}
                      className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      aria-label={`Insertar letra ${letter}`}
                      data-keyboard-button="true"
                    >
                      {isUpperCase ? letter : letter.toLowerCase()}
                    </button>
                  ))}
                </div>

                {/* Tercera fila de letras */}
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => insertText(isUpperCase ? letter : letter.toLowerCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          insertText(isUpperCase ? letter : letter.toLowerCase());
                        }
                      }}
                      className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      aria-label={`Insertar letra ${letter}`}
                      data-keyboard-button="true"
                    >
                      {isUpperCase ? letter : letter.toLowerCase()}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Botones de control */}
            <div className="flex gap-2 justify-center">
              {!numericFields.includes(activeInput || '') && (
                // Solo mostrar estos botones si NO es un campo numérico
                <div className="flex gap-2 justify-center mb-2 w-full">
                  <button
                    onClick={() => setIsUpperCase(!isUpperCase)}
                    className={`px-6 py-3 ${isUpperCase ? 'bg-blue-500' : 'bg-gray-200'} rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
                    aria-label={isUpperCase ? "Desactivar mayúsculas" : "Activar mayúsculas"}
                    data-keyboard-button="true"
                  >
                    ⇧
                  </button>
                  <button
                    onClick={() => insertText(' ')}
                    className="px-12 py-3 bg-gray-300 hover:bg-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
                    aria-label="Insertar espacio"
                    data-keyboard-button="true"
                  >
                    Espacio
                  </button>
                </div>
              )}
              
              {/* Botones de Borrar y Limpiar (siempre visibles) */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={deleteText}
                  className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  aria-label="Borrar último carácter"
                  data-keyboard-button="true"
                >
                  ← Borrar
                </button>
                <button
                  onClick={clearField}
                  className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  aria-label="Limpiar campo"
                  data-keyboard-button="true"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Confirmar Registro
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              ¿Está seguro de que desea guardar los datos del paciente?
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmarGuardado}
                className="px-4 py-2 bg-[#69b594] text-white rounded-md hover:bg-[#5aa382] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#69b594]"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Componente de Notificación */}
      {notification.show && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${
            notification.type === 'error' ? 'bg-red-100 border-l-4 border-red-500' : 'bg-green-100 border-l-4 border-green-500'
          }`}
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {notification.type === 'error' ? (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm ${notification.type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
                {notification.message}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="sr-only">Cerrar</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


