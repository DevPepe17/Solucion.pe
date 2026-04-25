"use client";

import { Bell, LayoutDashboard, PlusSquare, Search, User, Monitor, Wrench, Calendar, DollarSign, Save, Loader2, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { actualizarServicioForm, eliminarServicio } from "@/lib/actions/service.actions";
import { useRouter } from "next/navigation";

export default function EditClientPage({ servicio }: { servicio: any }) {
  const updateAction = actualizarServicioForm.bind(null, servicio.id);
  const [state, formAction, isPending] = useActionState(updateAction, null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.")) {
      setIsDeleting(true);
      await eliminarServicio(servicio.id);
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const formDate = servicio.fecha_entrega 
    ? new Date(servicio.fecha_entrega).toISOString().split('T')[0] 
    : '';

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden font-sans">
      <aside className="w-64 bg-[#121212] border-r border-[#222] flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-[#222]">
          <h1 className="text-[#FFB800] font-bold text-xl tracking-wider">SOLUCION.PE</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Technical Management</p>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-sm font-medium text-sm transition-colors">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/nuevo" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-sm font-medium text-sm transition-colors">
            <PlusSquare size={18} />
            New Service
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-[#121212] border-b border-[#222] flex items-center justify-between px-6 shrink-0">
          <div className="flex-1 max-w-xl"></div>
          <div className="flex items-center gap-4 ml-4">
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-full overflow-hidden border border-[#333]">
              <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" width={32} height={32} />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto scrollbar-thin p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#FFB800] uppercase tracking-wide">Editar Servicio #{servicio.id}</h1>
                <p className="text-gray-400 mt-1 text-sm">Modifique los detalles técnicos de la orden de trabajo.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting || isPending}
                  className="bg-[#2a0a0a] border border-red-900 text-red-500 hover:bg-red-950 px-4 py-2 rounded-sm text-sm font-bold transition-colors flex items-center gap-2"
                >
                  {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  ELIMINAR
                </button>
              </div>
            </div>

            <form action={formAction} className="space-y-6">
              
              {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-sm">
                  {state.error}
                </div>
              )}

              {/* Status Row */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Estado del Servicio</label>
                <select name="estado" defaultValue={servicio.estado} className="w-full md:w-1/3 bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]">
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="PROCESO">EN PROCESO</option>
                  <option value="LISTO">LISTO</option>
                  <option value="ENTREGADO">ENTREGADO</option>
                </select>
              </div>

              {/* Top Row: Client & Device (READ ONLY) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-60">
                
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-500" />
                  <div className="flex items-center gap-2 mb-6">
                    <User className="text-gray-400" size={20} />
                    <h2 className="text-lg font-bold text-gray-300">Datos del Cliente (Bloqueado)</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">DNI</label>
                      <input 
                        type="text" 
                        value={servicio.cliente.dni}
                        readOnly
                        className="w-full bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-sm px-3 py-2 text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={servicio.cliente.nombre}
                        readOnly
                        className="w-full bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-sm px-3 py-2 text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">WhatsApp</label>
                      <input 
                        type="text" 
                        value={"+51 " + servicio.cliente.telefono}
                        readOnly
                        className="w-full bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-sm px-3 py-2 text-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-500" />
                  <div className="flex items-center gap-2 mb-6">
                    <Monitor className="text-gray-400" size={20} />
                    <h2 className="text-lg font-bold text-gray-300">Información del Equipo (Bloqueado)</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipo de Equipo</label>
                      <input 
                        type="text" 
                        value={servicio.tipo_equipo}
                        readOnly
                        className="w-full bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-sm px-3 py-2 text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Marca</label>
                      <input value={servicio.marca} readOnly type="text" className="w-full bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-sm px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Modelo / Serie</label>
                      <input value={servicio.modelo} readOnly type="text" className="w-full bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-sm px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Especificaciones Adicionales</label>
                      <input value={servicio.especificaciones} readOnly type="text" className="w-full bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-sm px-3 py-2 text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                <div className="flex items-center gap-2 mb-6">
                  <Wrench className="text-red-500" size={20} />
                  <h2 className="text-lg font-bold text-white">Detalles del Servicio</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tipo de Servicio principal</label>
                    <input 
                      name="tipo_servicio"
                      defaultValue={servicio.tipo_servicio}
                      required
                      type="text" 
                      className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Descripción del Problema</label>
                    <textarea 
                      name="problema"
                      defaultValue={servicio.problema}
                      required
                      rows={3} 
                      className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Observaciones / Estado Estético</label>
                    <input 
                      name="observaciones"
                      defaultValue={servicio.observaciones}
                      type="text" 
                      className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 flex flex-col md:flex-row items-end gap-6">
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Calendar size={14} /> Fecha Estimada de Entrega
                    </label>
                    <input 
                      name="fecha_entrega"
                      defaultValue={formDate}
                      type="date" 
                      className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <DollarSign size={14} /> Costo Estimado (S/.)
                    </label>
                    <div className="flex">
                      <span className="bg-[#222] border border-[#333] border-r-0 px-3 py-2 text-[#FFB800] font-bold text-sm rounded-l-sm">S/.</span>
                      <input name="costo_total" defaultValue={servicio.costo_total?.toString()} type="number" step="0.01" className="flex-1 bg-[#0d0d0d] border border-[#333] text-white rounded-r-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    disabled={isPending || isDeleting} 
                    className="flex-1 sm:flex-none bg-[#222] border border-[#333] hover:bg-[#2a2a2a] text-white font-bold px-6 py-3 rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <XCircle size={18} />
                    CANCELAR
                  </button>
                  <button 
                    type="submit" 
                    disabled={isPending || isDeleting} 
                    className="flex-1 sm:flex-none bg-[#FFB800] hover:bg-[#e6a600] text-black font-bold px-8 py-3 rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    GUARDAR CAMBIOS
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
