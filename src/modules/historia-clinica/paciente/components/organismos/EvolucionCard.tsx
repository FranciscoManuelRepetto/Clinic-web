"use client";

import { useState } from "react";
import ToggleCompactButton from "../atoms/ToggleCompactButton";
import Modal from "@/globals/components/moleculas/Modal";
import MarcarErronea from "./FormMarcarErronea";
import { EvolucionCompleta } from "@/modules/historia-clinica/types/EvolucionCompleta";

interface ApiData {
  observacion?: string;
  id_turno?: number;
  tipo?: string;
  creada_por?: number;
  id_evolucion?: number;
  fecha_creacion?: string | Date;
  marcada_erronea?: boolean;
  motivo_erronea?: string;
  marcada_erronea_por?: number;
  id_diagnostico_multiaxial?: number;
}

interface Props {
  evoluciones: EvolucionCompleta[],
  setEvoluciones: any,
  title?: string;
  content?: string;
  data?: ApiData;
  creatorName?: string;
}

export default function EvolucionCard({
  title = 'EVOLUCIÓN',
  content = `La paciente presentó mejoras en la sesión de hoy:\nLorem ipsum dolor sit amet consectetur adipiscing elit, iaculis quis nunc lectus mollis accumsan dis, cursus senectus scelerisque mus quisque erat. Blandit mattis porttitor faucibus mus dapibus dictum nam, pharetra nullam est convallis fermentum rhoncus tortor quisque, odio eu inceptos neque nostra laoreet.`,
  data,
  creatorName,
  evoluciones,
  setEvoluciones
}: Props) {
  const [isCompact, setIsCompact] = useState(true);

  const createdAt = data?.fecha_creacion ? new Date(data.fecha_creacion) : undefined;
  const formattedCreatedAt = createdAt
    ? `${String(createdAt.getDate()).padStart(2, '0')}/${String(createdAt.getMonth() + 1).padStart(2, '0')}/${String(createdAt.getFullYear()).slice(-2)} ${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')} hs`
    : undefined;

  const baseTitle = title.includes(' - ') ? title.split(' - ')[0] : title;
  const headerTitle = creatorName
    ? `${baseTitle} - ${creatorName}${formattedCreatedAt ? ` (${formattedCreatedAt})` : ''}`
    : title;

  const onMarcarErronea = () => setShowModal(true)
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-6 border rounded-md overflow-hidden relative ml-6 md:ml-8">
      {/* header */}
      <div className={`flex items-center justify-between bg-[var(--color-manzana)] text-black px-4 ${isCompact ? 'py-2' : 'py-3'}`}>
        <div className="font-semibold text-sm md:text-base">{headerTitle}</div>
        <div>
          <ToggleCompactButton isCompact={isCompact} onToggle={() => setIsCompact(s => !s)} ariaLabel={isCompact ? 'Expandir' : 'Colapsar'} />
        </div>
      </div>

      {/* body - same animation as PatientCard */}
      <div className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${isCompact ? 'max-h-0 opacity-0 p-0' : 'max-h-[800px] opacity-100 p-4'}`}>
        <div className="prose prose-sm text-gray-800 whitespace-pre-line">{data?.observacion ?? content}</div>
        {
          data?.marcada_erronea &&
          <div className="prose prose-sm text-gray-800 whitespace-pre-line">SE MARCO COMO ERRONEA! Motivo: {data?.motivo_erronea} </div>
        }
        <div className="mt-6 flex justify-between">
          {/* Grey button is non-interactive for now: no hover/focus changes */}
          <button
            className="inline-flex items-center gap-2 bg-gray-400 text-black px-4 py-2 rounded-md cursor-not-allowed"
            aria-disabled="true"
            disabled
          >
            Sin turno Vinculado
          </button>

          <button className="inline-flex items-center gap-2 bg-rose-300 text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200 hover:bg-rose-400 transition-colors duration-150"
            onClick={onMarcarErronea}
          >
            Marcar como Errónea
          </button>
          {showModal &&
            <Modal title="Marcar Evolucion como Erronea" onClose={() => setShowModal(false)}>
                <MarcarErronea id_evolucion={data.id_evolucion}  evoluciones={evoluciones} setEvoluciones={setEvoluciones} goBack={() => setShowModal(false)}/>
            </Modal>
          }
        </div>
      </div>
    </div>
  );
}
