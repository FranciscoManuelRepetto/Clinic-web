"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir automáticamente a /Home
    router.push("/Home");
  }, [router]);

  // Mostrar un mensaje de carga mientras redirige
  return (
    <div className="font-sans bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl font-semibold text-gray-700 mb-2">
          Cargando...
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a4eac3] mx-auto"></div>
      </div>
    </div>
  );
}
