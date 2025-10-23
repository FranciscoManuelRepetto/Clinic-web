"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";
import Login from "./login/Login";
import Home from "./home/page";
import RegistrarPaciente from "./registrar-paciente/page";
import BuscarPaciente from "./buscar-paciente/page";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
  
  const renderPage = () => {
    switch (pathname) {
      case '/home':
        return <Home t={t} language={language} changeLanguage={changeLanguage} />;
      case '/registrar-paciente':
        return <RegistrarPaciente t={t} language={language} changeLanguage={changeLanguage} />;
      case '/buscar-paciente':
        return <BuscarPaciente t={t} language={language} changeLanguage={changeLanguage} />;
      case '/':
        return <Home t={t} language={language} changeLanguage={changeLanguage} />;
      default:
        return <Home t={t} language={language} changeLanguage={changeLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar t={t} onCollapseChange={setSidebarCollapsed} />
      <div className={`${sidebarCollapsed ? 'ml-24' : 'ml-64'} flex flex-col transition-all duration-300`}>
        <Header 
          onLogout={handleLogout} 
          t={t} 
          language={language} 
          changeLanguage={changeLanguage} 
        />
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
