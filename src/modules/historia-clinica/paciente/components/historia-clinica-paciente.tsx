"use client";
import { useState } from 'react';
import { useTranslations } from "@/globals/hooks/useTranslations";
import PageHeader from "@/globals/components/organismos/PageHeader";
import PatientCard from "./organismos/PatientCard";
import PatientEvolutionHeader from "./moleculas/PatientEvolutionHeader";
import MultiaxialCard from "./organismos/MultiaxialCard";
import EvolucionCard from "./organismos/EvolucionCard";
import CorreccionCard from "./organismos/CorreccionCard";
import SOTCard from "./organismos/SOTCard";
import RecetaCard from "./organismos/RecetaCard";
import { EvolucionCompleta } from '../../types/EvolucionCompleta';
interface Props {
  t?: (key: string) => string;
}

export default function HistoriaClinicaPaciente({ t: propT }: Props) {
  const { t: hookT } = useTranslations();
  const t = propT || hookT;
  const [evoluciones, setEvoluciones] = useState<EvolucionCompleta[]>([]);

  // ejemplo mínimo de datos; en el futuro esto vendrá desde la API
  const patientData = {
    name: t ? t('patient.name') : 'Anabella Sofía Perri',
    dni: '12.345.678',
    sexo: 'Femenino',
    nacimiento: '20/10/2001, 24 años',
    obraSocial: 'Swiss Medical',
    ingreso: '24/08/2024',
    domicilio: 'Calle Falsa 123',
    telefono: '2995554123',
    email: 'anitadeluxe@yamail.com',
  };

  // ejemplo de respuesta de la API para Multiaxial
  const multiaxialApi = {
    id_item1: 'EJE 1 F32.1  Depresión leve',
    id_item2: 'EJE 2 F41.0  Trastorno de ansiedad',
    id_item3: 'EJE 3 F50.9  Trastorno alimentario',
    id_item4: 'EJE 4 F43.1  Estrés agudo',
    id_item5: 'EJE 5 F60.0  Trastorno de personalidad',
    id_diagnostico_multiaxial: 1,
    creado_por: 123,
    fecha_creacion: '2025-11-08T17:51:34.719Z',
  };

  const multiaxialCreatorName = 'Psicólogo Carlos Acuña';

  const evolucionApi = {
    observacion: 'La paciente no presentó mejoras, pero se mostró más abierta a la sesión ya que:\nLorem ipsum dolor sit amet consectetur adipiscing elit, iaculis quis nunc lectus...',
    id_turno: 0,
    tipo: 'individual',
    creada_por: 456,
    id_evolucion: 11,
    fecha_creacion: '2025-11-08T18:15:03.329Z',
    marcada_erronea: true,
    motivo_erronea: 'La nota contiene información contradictoria respecto al antecedente previo.',
    marcada_erronea_por: 789,
    fecha_marcada_erronea: '2025-11-08T16:52:00.000Z',
    id_diagnostico_multiaxial: 0,
  };

  const evolucionCreatorName = 'Psiquiatra Pablo Rojas';

  const correccionMarkerName = 'Administradora Lucía Mendoza';

  const sotApi = {
    motivo: 'El paciente realizó una llamada ya que tenía miedo de la oscuridad.',
    dni_profesional: '27.654.321',
    fecha: '2025-11-09',
    hora: '21:14:02.691Z',
    observacion: 'Paciente refiere mejoría parcial en el sueño y disminución de la ansiedad en situaciones sociales.',
    id_sot: 42,
    creado_por: 555,
    fecha_creacion: '2025-11-09T21:14:02.691Z',
    dni_paciente: '12.345.678',
    motivo_modificado: 'Se corrigió un dato de horario mal cargado.',
    modificado_por: 789,
    fecha_modificacion: '2025-11-09T22:00:00.000Z',
    modificado: true,
  };

  const sotProfessionalName = 'Enfermero/a Marta Gómez';

  return (
    <main className="flex-1 p-6">
      <div className="max-w-4xl mx-auto px-6 py-3">
        <PageHeader
          /* Breadcrumb + green line above the card */
          breadCrumbConf={{
            items: [
              { label: t ? t("navbar.menus.historiaClinica") : "Historia Clínica" },
              { label: t ? t("searchPatient.title") : "Buscar Paciente" },
              { label: t ? t("patient.name") : patientData.name, isActive: true },
            ],
            t: t,
          }}
        />

        <PatientCard t={t} data={patientData} />

        <PatientEvolutionHeader evoluciones={evoluciones} setEvoluciones={setEvoluciones}/>

        {
          evoluciones.length != 0 &&
          evoluciones.map(evolucion => { 
            let data = {
                id_evolucion: evolucion.id_evolucion,
                fecha_creacion: evolucion.creacion.fecha,
                observacion: evolucion.observacion
              }
            if (evolucion.erronea) {
              data.marcada_erronea = true;
              data.motivo_erronea = evolucion.erronea.motivo;
              data.marcada_erronea_por = evolucion.erronea.nombre;
            }

            return (
            <EvolucionCard key={evolucion.id_evolucion} data={data}
             creatorName={evolucion.creacion.nombre}
             evoluciones={evoluciones}
             setEvoluciones={setEvoluciones}
             />
          )})
        }

  <MultiaxialCard data={multiaxialApi} creatorName={multiaxialCreatorName} />

  <EvolucionCard data={evolucionApi} creatorName={evolucionCreatorName}
            evoluciones={evoluciones}
            setEvoluciones={setEvoluciones}/>

  <CorreccionCard data={evolucionApi} markerName={correccionMarkerName} creatorName={evolucionCreatorName} />

  {/* SOT card (comes from SOT API). If modified, the SOTCard will render a CorreccionCard derived from the SOT data. */}
  <SOTCard data={sotApi} professionalName={sotProfessionalName} creatorName={sotProfessionalName} />

  <RecetaCard />
      </div>
    </main>
  );
}
