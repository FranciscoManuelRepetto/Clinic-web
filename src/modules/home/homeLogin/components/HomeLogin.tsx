import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";


interface Turno {
  id: number;
  hora: string;
  servicio: string;
}

const HomeLogin: React.FC = () => {
  const { user, isLoading: userCargando } = useUser();
  const turnos: Turno[] = [
    { id: 1, hora: "09:00", servicio: "Consulta general" },
    { id: 2, hora: "10:30", servicio: "Control odontológico" },
    { id: 3, hora: "12:00", servicio: "Chequeo anual" },
    { id: 4, hora: "15:00", servicio: "Vacunación" },
  ];

  const fecha = "Lunes 01/02";
  if (userCargando) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
    </div>
    );
  }else{
    console.log("DATOS DE USUARIO: ", user);
  }

  return (
    <div className="flex flex-col p-20 mt-10 space-y-10 font-sans">
      <h1 className="text-4xl font-semibold text-black">
        Bienvenido, {user.name}
      </h1>

      <div className="w-2/3 mx-auto rounded-md overflow-hidden shadow-sm">
        {/* Etiqueta de fecha integrada */}
        <div className="bg-blue-200 text-black font-semibold px-4 py-2 text-lg w-36 border-b border-gray-600">
          {fecha}
        </div>

        {/* Dashboard de turnos */}
        {turnos.map((turno, index) => (
          <div
            key={turno.id}
            className={`py-3 px-4 border-b border-gray-600 ${
              index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-300"
            }`}
          >
            <p className="text-gray-800">
              <span className="font-semibold">{turno.hora}</span> —{" "}
              {turno.servicio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLogin;
