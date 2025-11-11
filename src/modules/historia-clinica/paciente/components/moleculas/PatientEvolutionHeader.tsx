"use client";

import { Plus, ChevronUp, CreditCard } from "lucide-react";
import { useState } from "react";
import Modal from "../../../../../globals/components/moleculas/Modal";
import CrearEvolucion from "../organismos/FormCrearEvolucion";
import { EvolucionCompleta } from "@/modules/historia-clinica/types/EvolucionCompleta";

interface Props {
  evoluciones?:EvolucionCompleta[];
  setEvoluciones?: any;
  title?: string;
  leftLabel?: string;
  rightLabel?: string;
  onCreate?: () => void;
  onRightClick?: () => void;
}

export default function PatientEvolutionHeader({
  title = 'Evolución del Paciente',
  leftLabel = 'Crear Evolución',
  rightLabel = 'Más recientes',
  onCreate,
  onRightClick,
  evoluciones,
  setEvoluciones
}: Props) {
  if (!onCreate) {
    onCreate = () => setShowModal(true)
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="mt-6">
      <h3 className="text-3xl font-semibold text-[var(--color-manzana)] mb-3">{title}</h3>

      <div className="flex items-center justify-between">
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-3 bg-[var(--color-manzana)] text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-150"
        >
          <span>{leftLabel}</span>
          <Plus className="w-4 h-4" />
        </button>
        {showModal &&
            <Modal title="Cargar Evolucion" onClose={() => setShowModal(false)}>
                <CrearEvolucion evoluciones={evoluciones} setEvoluciones={setEvoluciones} goBack={() => setShowModal(false)}/>
            </Modal>
        }
        <button onClick={onRightClick} className="inline-flex items-center gap-2 text-gray-800 hover:text-black focus:outline-none">
          <span className="mr-1">{rightLabel}</span>
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
