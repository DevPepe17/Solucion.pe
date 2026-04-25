"use client";

import { Bell, Settings, LayoutDashboard, PlusSquare, Search, User, Monitor, Wrench, Camera, Calendar, DollarSign, Save, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { registrarServicioForm, validarClientePorDni } from "@/lib/actions/service.actions";

export default function NuevoServicioPage() {
  const [state, formAction, isPending] = useActionState(registrarServicioForm, null);
  
  const [dni, setDni] = useState("");
  const [clienteInfo, setClienteInfo] = useState({ nombre: "", telefono: "" });
  const [validandoDni, setValidandoDni] = useState(false);

  const handleValidarDni = async () => {
    if (!dni || dni.length !== 8) return;
    setValidandoDni(true);
    const res = await validarClientePorDni(dni);
    if (res.success && res.cliente) {
      setClienteInfo({ nombre: res.cliente.nombre, telefono: res.cliente.telefono });
    } else {
      setClienteInfo({ nombre: "", telefono: "" });
      alert("Cliente no encontrado, puedes ingresarlo manualmente.");
    }
    setValidandoDni(false);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden font-sans">
      {/* Sidebar */}
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
          <Link href="/nuevo" className="flex items-center gap-3 px-4 py-3 bg-[#FFB800] text-black rounded-sm font-semibold text-sm transition-colors">
            <PlusSquare size={18} />
            New Service
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#121212] border-b border-[#222] flex items-center justify-between px-6 shrink-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search service ID..." 
                className="w-full bg-[#1a1a1a] border border-[#333] text-sm text-white rounded-sm pl-10 pr-4 py-2 focus:outline-none focus:border-[#FFB800] transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-full overflow-hidden border border-[#333]">
              <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" width={32} height={32} />
            </div>
          </div>
        </header>

        {/* Form Content */}
        <div className="flex-1 overflow-auto scrollbar-thin p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-[#FFB800] uppercase tracking-wide">Registro de Nuevo Servicio</h1>
              <p className="text-gray-400 mt-1 text-sm">Ingrese los detalles técnicos para iniciar la orden de trabajo.</p>
            </div>

            <form action={formAction} className="space-y-6">
              
              {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-sm">
                  {state.error}
                </div>
              )}

              {/* Top Row: Client & Device */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Client Data */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]" />
                  <div className="flex items-center gap-2 mb-6">
                    <User className="text-[#FFB800]" size={20} />
                    <h2 className="text-lg font-bold text-white">Datos del Cliente</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">DNI</label>
                      <div className="flex gap-2">
                        <input 
                          name="dni"
                          type="text" 
                          maxLength={8}
                          value={dni}
                          onChange={(e) => setDni(e.target.value)}
                          placeholder="7245XXXX" 
                          required
                          className="flex-1 bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" 
                        />
                        <button 
                          type="button" 
                          onClick={handleValidarDni}
                          disabled={validandoDni}
                          className="bg-[#222] border border-[#333] text-[#FFB800] hover:bg-[#2a2a2a] px-4 py-2 rounded-sm text-xs font-bold transition-colors disabled:opacity-50"
                        >
                          {validandoDni ? <Loader2 className="animate-spin" size={16}/> : "VALIDAR"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nombre Completo</label>
                      <input 
                        name="nombre"
                        type="text" 
                        required
                        value={clienteInfo.nombre}
                        onChange={(e) => setClienteInfo({...clienteInfo, nombre: e.target.value})}
                        placeholder="Juan Pérez" 
                        className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">WhatsApp</label>
                      <div className="flex">
                        <span className="bg-[#222] border border-[#333] border-r-0 px-3 py-2 text-gray-400 text-sm rounded-l-sm">+51</span>
                        <input 
                          name="telefono"
                          type="text" 
                          required
                          value={clienteInfo.telefono}
                          onChange={(e) => setClienteInfo({...clienteInfo, telefono: e.target.value})}
                          placeholder="987 654 321" 
                          className="flex-1 bg-[#0d0d0d] border border-[#333] text-white rounded-r-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Device Info */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]" />
                  <div className="flex items-center gap-2 mb-6">
                    <Monitor className="text-[#FFB800]" size={20} />
                    <h2 className="text-lg font-bold text-white">Información del Equipo</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tipo de Equipo</label>
                      <select name="tipo_equipo" className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800] appearance-none">
                        <option value="Laptop">Laptop</option>
                        <option value="PC de Escritorio">PC de Escritorio</option>
                        <option value="Consola">Consola</option>
                        <option value="Celular">Celular</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Marca</label>
                      <input name="marca" required type="text" placeholder="ASUS, Dell, HP..." className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Modelo / Serie</label>
                      <input name="modelo" required type="text" placeholder="ROG Strix G15" className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Especificaciones Adicionales</label>
                      <input name="especificaciones" type="text" placeholder="16GB DDR4, SSD 512GB..." className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Service Details */}
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
                      required
                      type="text" 
                      placeholder="Ej: Mantenimiento Pro, Reparación de Placa..."
                      className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Descripción del Problema</label>
                    <textarea 
                      name="problema"
                      required
                      rows={3} 
                      placeholder="El equipo no enciende tras una subida de tensión..." 
                      className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Observaciones / Estado Estético</label>
                    <input 
                      name="observaciones"
                      type="text" 
                      placeholder="Rayaduras en tapa superior, falta tornillo base." 
                      className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row: Delivery & Cost */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 flex flex-col md:flex-row items-end gap-6">
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Calendar size={14} /> Fecha Estimada de Entrega
                    </label>
                    <input 
                      name="fecha_entrega"
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
                      <input name="costo_total" type="number" step="0.01" placeholder="0.00" className="flex-1 bg-[#0d0d0d] border border-[#333] text-white rounded-r-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FFB800]" />
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={isPending} className="w-full md:w-auto bg-[#FFB800] hover:bg-[#e6a600] text-black font-bold px-8 py-3 rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                  {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  REGISTRAR SERVICIO
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
