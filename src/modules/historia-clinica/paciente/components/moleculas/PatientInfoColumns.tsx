"use client";

import ToggleCompactButton from "../atoms/ToggleCompactButton";

interface PatientData {
  name?: string;
  dni?: string;
  sexo?: string;
  nacimiento?: string;
  obraSocial?: string;
  ingreso?: string;
  domicilio?: string;
  telefono?: string;
  email?: string;
}

interface Props {
  data?: PatientData;
  isCompact?: boolean;
  onToggle?: () => void;
}

export default function PatientInfoColumns({ data, isCompact, onToggle }: Props) {
  const d = data || {} as PatientData;

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-between mb-0">
        <h2 className="text-3xl font-semibold text-[#7fb77a]">{d.name || 'patient.name'}</h2>
        {/* Show toggle in expanded view (when not compact) */}
        {!isCompact ? (
          <ToggleCompactButton isCompact={!!isCompact} onToggle={onToggle ?? (() => {})} ariaLabel={isCompact ? 'Expandir tarjeta' : 'Colapsar tarjeta'} />
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
        <div>
          <p className="mb-1"><strong>DNI</strong> {d.dni || '12.345.678'}</p>
          <p className="mb-1">{d.sexo || 'Femenino'}</p>
          <p className="mb-1">{d.nacimiento || '20/10/2001, 24 años'}</p>
        </div>

        <div className="text-gray-600">
          <p className="mb-1"><strong>Obra Social:</strong> {d.obraSocial || 'Swiss Medical'}</p>
          <p className="mb-1"><strong>Ingreso:</strong> {d.ingreso || '24/08/2024'}</p>
          <p className="mb-1"><strong>Domicilio:</strong> {d.domicilio || 'Calle Falsa 123'}</p>
          <p className="mb-1"><strong>Teléfono:</strong> {d.telefono || '2995554123'}</p>
          <p className="mb-1"><strong>E-mail:</strong> {d.email || 'anitadeluxe@yamail.com'}</p>
        </div>
      </div>
    </div>
  );
}
