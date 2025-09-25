"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";
import Login from "./login/Login";
import Home from "./home/page";
import RegistrarPaciente from "./registrar-paciente/page";
import BuscarPaciente from "./buscar-paciente/page";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { t, language, changeLanguage, isLoading: translationsLoading } = useTranslations();

  useEffect(() => {
    // Verificar si hay una sesión activa en localStorage
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    // Simular login exitoso
    localStorage.setItem('authToken', 'fake-token');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  if (isLoading || translationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  // Si no está logueado, mostrar login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Si está logueado, mostrar la página correspondiente según la ruta
  console.log('Current pathname:', pathname);
  switch (pathname) {
    case '/home':
      return <Home onLogout={handleLogout} t={t} language={language} changeLanguage={changeLanguage} />;
    case '/registrar-paciente':
      return <RegistrarPaciente onLogout={handleLogout} t={t} language={language} changeLanguage={changeLanguage} />;
    case '/buscar-paciente':
      return <BuscarPaciente onLogout={handleLogout} t={t} language={language} changeLanguage={changeLanguage} />;
    case '/':
      return <Home onLogout={handleLogout} t={t} language={language} changeLanguage={changeLanguage} />;
    default:
      return <Home onLogout={handleLogout} t={t} language={language} changeLanguage={changeLanguage} />;
  }
}
