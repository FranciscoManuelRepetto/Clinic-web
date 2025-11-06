const BASE_URL_PERSONAL = "http://localhost:8003"
const BASE_URL_MEDICAMENTOS = "http://localhost:8002"
const BASE_URL_TURNOS = "http://localhost:8001"
const BASE_URL_HISTORIA_CLINICA = "http://localhost:8000"

const ENDPOINTS = {
    HISTORIA_CLINICA: {
        BUSCAR_PACIENTES: {
            URL: (params) => `${BASE_URL_HISTORIA_CLINICA}/pacientes?${params.nom_ap_dni ? `nom_ap_dni=${params.nom_ap_dni}&`: ''}${params.anio_ingreso_desde ? `anio_ingreso_desde=${params.anio_ingreso_desde}&`: ''}${params.anio_ingreso_hasta ? `anio_ingreso_hasta=${params.anio_ingreso_hasta}&`: ''}${params.genero ? `genero=${params.genero}&`: ''}${params.limit ? `limit=${params.limit}&`: ''}${params.page ? `page=${params.page}&`: ''}${params.order ? `order=${params.order}&`: ''}${params.sort ? `sort=${params.sort}&`: ''}`,
            METHOD: 'get'
        },
        CREAR_PACIENTE: {

        }
    }
};

export default ENDPOINTS;