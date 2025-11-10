"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "@/globals/hooks/useTranslations";
import Login from "@/modules/auth/components/Login";
import Home from "@/modules/home/homeLoggout/components/Home";
import HomeLogin from "@/modules/home/homeLogin/components/HomeLogin";
import HistoriaClinica from "@/modules/historia-clinica/historia-clinica";
import RegistrarPaciente from "@/modules/historia-clinica/registrarPaciente/components/registrar-paciente";
import BuscarPaciente from "@/modules/historia-clinica/buscarPaciente/components/buscar-paciente";
import BuscarMedicamentos from "@/modules/medicamentos/components/buscar-Medicamentos";
import Header from "@/globals/components/organismos/Header";
import Sidebar from "@/globals/components/organismos/Sidebar";
import HeaderNotLogger from "@/globals/components/organismos/HeaderNotLogger";
import Medicamentos from "@/modules/medicamentos/medicamentos";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, changeLanguage, isLoading: translationsLoading } = useTranslations();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      if (pathname !== '/' && pathname !== '/login') {
        router.replace('/');
      }
    } else {
      if (pathname === '/login') {
        router.replace('/home');
      }
    }
  }, [isLoggedIn, isLoading, pathname, router]);

  const handleLogin = () => {
    localStorage.setItem('authToken', 'fake-token');
    setIsLoggedIn(true);
    router.push('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.replace('/');
  };

  if (isLoading || translationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    if (pathname === '/login') {
      return <Login onLogin={handleLogin} />;
    }
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <HeaderNotLogger t={t} />
        <main className="flex-1">
          <Home t={t} language={language} changeLanguage={changeLanguage} />
        </main>
      </div>
    );
  }

  const routes = {
    '/': <HomeLogin />,
    '/home': <HomeLogin />,
    '/historia-clinica': <HistoriaClinica />,
    '/registrar-paciente': <RegistrarPaciente t={t} language={language} changeLanguage={changeLanguage} />,
    '/buscar-paciente': <BuscarPaciente t={t} language={language} changeLanguage={changeLanguage} />,
    '/buscar-medicamentos': <BuscarMedicamentos t={t} language={language} changeLanguage={changeLanguage} />,

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
          {routes[pathname as keyof typeof routes] || <HomeLogin />}
        </main>
      </div>
    </div>
  );
}
