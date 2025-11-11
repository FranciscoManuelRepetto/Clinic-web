'use client'
import useMarcarErronea from "@/modules/historia-clinica/hooks/useMarcarErronea";
import { useState, useEffect } from "react";
import { EvolucionCompleta } from "@/modules/historia-clinica/types/EvolucionCompleta";

export default function MarcarErronea({goBack, id_usuario, id_evolucion, evoluciones, setEvoluciones}:
     {goBack(): void, id_usuario: number, id_evolucion: number, evoluciones: EvolucionCompleta[], setEvoluciones: any}) {
    id_usuario = 10; //HARDCODEADO!!
    const { marcarErronea, isLoading, error} = useMarcarErronea()
    const [pedirConfirmacion, setPedirConfirmacion] = useState(false);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const initialFormState = {
        motivo_erronea: "",
    }
    const [formData, setFormData] = useState(initialFormState);
    const [validationErrors, setValidationErrors] = useState<{campo: string, msg: string}[]>([]); // Agregar este estado para manejar los mensajes de error

    // Función para manejar cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Funcion para verificar campos obligatorios
    const missingFields = () => {
        // Lista de campos requeridos con sus nombres amigables
        const requiredFields: { key: keyof FormData; label: string }[] = [
            { key: 'motivo_erronea', label: 'Motivo' },
        ];
        
        // Verificar campos vacíos
        let missingFields = requiredFields.filter(field => !formData[field.key]);
        
        if (missingFields.length > 0) {
            // Crear mensajes de error específicos
            const errors: {campo: string, msg: string}[] = missingFields.map(field => ({campo: field.key, msg: `El campo ${field.label} es obligatorio.`}));
            setValidationErrors(errors);
            
            // Mostrar alerta con los campos faltantes
            const errorMessage = `Existen campos faltantes: \n\n${errors.map(error => error.msg).join('\n')}`;
            alert(errorMessage);
            
            // Enfocar el primer campo faltante
            const firstMissingField = document.getElementById(missingFields[0].key);
            if (firstMissingField) {
                firstMissingField.focus();
            }
            return true;
        }
        return false;
    }

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Si todos los campos requeridos están completos, limpiar errores y mostrar modal de confirmación
        if (missingFields())
            return;


        setValidationErrors([]);
        setPedirConfirmacion(true);
    };
    
    const handleConfirmarGuardado = async () => {
        setMostrarResultado(true);
        setPedirConfirmacion(false);
        let evolucion = await marcarErronea(id_usuario, id_evolucion, formData);
        if (evolucion != null) {
            // Actualizo los datos...
            let anteriores = evoluciones.filter(evolucion => Number(evolucion.id_evolucion) < id_evolucion)
            let posteriores = evoluciones.filter(evolucion => Number(evolucion.id_evolucion) > id_evolucion)
            setEvoluciones([...anteriores, evolucion, ...posteriores])
        }
    };

    return (
        <>
            <div id="formulario" className={`overflow-hidden ${pedirConfirmacion || mostrarResultado ? 'max-h-0' : ''}`}>
                <form
                    id="formulario-marcar_erronea"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full mb-4 border-b border-gris pb-6">
                        <div className="mb-1">{/*flex items-center */}
                            <label htmlFor="motivo_erronea" className="block text-sm font-medium text-gris-oscuro uppercase">
                            Motivo <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <textarea 
                            id="motivo_erronea" 
                            name="motivo_erronea" 
                            type="text"
                            required
                            value={formData.motivo_erronea} 
                            onChange={handleInputChange} 
                            className={`w-full px-3 py-2 border ${
                            validationErrors.some(error => error.campo === "motivo_erronea")
                                ? 'border-red-500 ring-1 ring-red-500' 
                                : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-manzana bg-white text-black`}
                            placeholder="Ingrese el motivo por el cual marca como erronea la evolucion..."
                        ></textarea>
                        { validationErrors.some(error => error.campo === "motivo_erronea") && (
                            <p id="motivo_erronea-error" className="text-red-500 text-sm mt-1">
                            {validationErrors[validationErrors.findIndex(error => error.campo === "motivo_erronea")].msg}
                            </p>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                        type="button"
                        onClick={goBack}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 
                                transition-all duration-200 focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-gray-600"
                        >
                        Volver
                        </button>
                        <button
                        className="px-6 py-2 rounded-lg flex items-center transition-all duration-200 
                                bg-primary text-black hover:bg-primary/80 
                                focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-primary"
                        >
                        Guardar
                    </button>
                </div>
                </form>
            </div>
            <div id="confirmacion" className={`overflow-hidden ${pedirConfirmacion && !mostrarResultado ? '' : 'max-h-0'}`}>
                <div className="w-full">
                    <h2 className="text-xl font-semibold text-gris-oscuro mb-4 text-center">
                        Esta seguro de que desea marcar como erronea esta evolucion?
                    </h2>
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => setPedirConfirmacion(false)}
                            className="px-4 py-2 bg-gray-200 rounded-md text-gris hover:bg-gris-claro transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            No, volver
                        </button>
                        <button 
                            onClick={handleConfirmarGuardado}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Si, marcarla como erronea
                        </button>
                    </div>
                </div>
            </div>
            <div id="resultado" className={`overflow-hidden ${mostrarResultado && !pedirConfirmacion ? '' : 'max-h-0'}`}>
                <div className="w-full">
                    {
                        isLoading ?
                        <p className="text-lg font-gris">Cargando... espere por favor.</p>
                        :
                            error ?
                            <h2 className="text-lg font-semibold text-red-500 mb-4 text-center">{error}</h2>
                            :
                            <h2 className="text-lg font-semibold text-primary mb-4 text-center">La evolucion se marco como erronea con exito</h2>
                    }
                    {
                        !isLoading &&
                        <div className="flex justify-center gap-4">
                            {
                                error ? 
                                <button 
                                    onClick={() => {setPedirConfirmacion(false); setMostrarResultado(false)}}
                                    className="px-4 py-2 bg-gray-200 rounded-md text-gris hover:bg-gris-claro transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                >
                                    Volver
                                </button>
                                :
                                <button 
                                    onClick={() => {setFormData(initialFormState); goBack()}}
                                    className="px-4 py-2 bg-primary rounded-md text-black hover:bg-secondary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400"
                                >
                                    Entendido
                                </button>
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}