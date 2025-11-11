"use client"

import type React from "react"
import { useState } from "react"
import Modal from "@/globals/components/moleculas/Modal"
import { Medicamento } from "@/modules/medicamentos/types/Medicamento"

interface MedicationMovementData {
  id_paciente: number
  id_profesional: number
  cantidad: number
  motivo: string
}

interface MedicationWithdrawalModalProps {
  medicamento: Medicamento
  onClose: () => void
  onSubmit: (medicamento: Medicamento, data: MedicationMovementData) => Promise<void>
}

export function MedicationWithdrawalModal({ medicamento, onClose, onSubmit }: MedicationWithdrawalModalProps) {
  const [formData, setFormData] = useState<MedicationMovementData>({
    id_paciente: 0,
    id_profesional: 0,
    cantidad: 0,
    motivo: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hayStock = medicamento.stock > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id_paciente" || name === "id_profesional" || name === "cantidad" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validar campos
    if (formData.id_paciente <= 0) {
      setError("Por favor ingresa un ID de paciente válido")
      return
    }
    if (formData.id_profesional <= 0) {
      setError("Por favor ingresa un ID de profesional válido")
      return
    }
    if (formData.cantidad <= 0) {
      setError("La cantidad debe ser mayor a 0")
      return
    }
    if (!formData.motivo.trim()) {
      setError("Por favor ingresa un motivo")
      return
    }

    setLoading(true)
    try {
      await onSubmit(medicamento, formData)
      // Reset form and close
      setFormData({ id_paciente: 0, id_profesional: 0, cantidad: 0, motivo: "" })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar el medicamento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal onClose={onClose} title="Egreso de Medicamentos">
      <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 mb-4">
        <p className="font-semibold text-gray-900">{medicamento.nombre_comercial}</p>
        <p className="mt-1">
          <span className="font-medium">Nombre genérico:</span> {medicamento.nombre_generico}
        </p>
        <p className="mt-1">
          <span className="font-medium">Presentación:</span> {medicamento.presentacion}
        </p>
        <p className= {hayStock ? "mt-1" : "mt-1 text-red-500"}>
          <span className="font-medium">Stock actual:</span> {medicamento.stock}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ID Paciente */}
        <div>
          <label htmlFor="id_paciente" className="block text-sm font-semibold text-gray-700 mb-2">
            ID Paciente
          </label>
          <input
            type="number"
            id="id_paciente"
            name="id_paciente"
            value={formData.id_paciente || ""}
            onChange={handleChange}
            placeholder="Ej: 12345"
            disabled={!hayStock}
            className={"w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" + (hayStock ? "" : " disabled:bg-gray-200 disabled:cursor-not-allowed")}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Identificador único del paciente</p>
        </div>

        {/* ID Profesional */}
        <div>
          <label htmlFor="id_profesional" className="block text-sm font-semibold text-gray-700 mb-2">
            ID Profesional
          </label>
          <input
            type="number"
            id="id_profesional"
            name="id_profesional"
            value={formData.id_profesional || ""}
            onChange={handleChange}
            placeholder="Ej: 67890"
            disabled={!hayStock}
            className={"w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" + (hayStock ? "" : " disabled:bg-gray-200 disabled:cursor-not-allowed")}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Identificador único del profesional</p>
        </div>

        {/* Cantidad */}
        <div>
          <label htmlFor="cantidad" className="block text-sm font-semibold text-gray-700 mb-2">
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad || ""}
            onChange={handleChange}
            placeholder="Ej: 5"
            className={"w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" + (hayStock ? "" : " disabled:bg-gray-200 disabled:cursor-not-allowed")}
            disabled={!hayStock}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Cantidad de unidades a egresar</p>
        </div>

        {/* Motivo */}
        <div>
          <label htmlFor="motivo" className="block text-sm font-semibold text-gray-700 mb-2">
            Motivo
          </label>
          <textarea
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            placeholder="Describe el motivo del egreso de medicamentos..."
            rows={4}
            className={"w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors resize-none" + (hayStock ? "" : " disabled:bg-gray-200 disabled:cursor-not-allowed")}
            disabled={!hayStock}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Motivo o descripción del egreso</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || !hayStock}
            className={"flex-1 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300 transition-colors" + (hayStock ? "" : " disabled:bg-gray-200 disabled:cursor-not-allowed")}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
