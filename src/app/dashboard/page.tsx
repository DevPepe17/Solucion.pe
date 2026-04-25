import { BarChart3, Clock, CheckCircle2, LayoutDashboard, PlusSquare, Settings, Bell, Search, Filter, Download, Eye, Edit2, Send, Server } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const totalServicios = await prisma.servicio.count();
  
  const pendientesCount = await prisma.servicio.count({
    where: { estado: { in: ['PENDIENTE', 'PROCESO'] } }
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const listosHoyCount = await prisma.servicio.count({
    where: { 
      estado: 'LISTO',
      fecha_registro: { gte: today } 
    }
  });

  const servicios = await prisma.servicio.findMany({
    include: { cliente: true },
    orderBy: { fecha_registro: 'desc' },
    take: 50 // limit to 50 for now
  });

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121212] border-r border-[#222] flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-[#222]">
          <h1 className="text-[#FFB800] font-bold text-xl tracking-wider">SOLUCION.PE</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Technical Management</p>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#FFB800] text-black rounded-sm font-semibold text-sm transition-colors">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/nuevo" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-sm font-medium text-sm transition-colors">
            <PlusSquare size={18} />
            New Service
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <Link href="/nuevo" className="w-full flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#e6a600] text-black py-3 rounded-sm font-bold text-sm transition-colors">
            <PlusSquare size={18} />
            CREATE TICKET
          </Link>
        </div>
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
                placeholder="Buscar por DNI o Cliente..." 
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

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6 scrollbar-thin">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#333] group-hover:bg-[#FFB800] transition-colors" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Servicios</p>
                  <h3 className="text-4xl font-light text-white tracking-tight">{totalServicios}</h3>
                </div>
                <div className="p-2 bg-[#222] rounded-sm text-[#FFB800]">
                  <BarChart3 size={20} />
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#333] group-hover:bg-[#FFB800] transition-colors" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pendientes</p>
                  <h3 className="text-4xl font-light text-[#FFB800] tracking-tight">{pendientesCount}</h3>
                </div>
                <div className="p-2 bg-[#222] rounded-sm text-[#FFB800]">
                  <Clock size={20} />
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#333] group-hover:bg-blue-500 transition-colors" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Listos Hoy</p>
                  <h3 className="text-4xl font-light text-white tracking-tight">{listosHoyCount}</h3>
                </div>
                <div className="p-2 bg-[#222] rounded-sm text-blue-500">
                  <CheckCircle2 size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm flex flex-col">
            <div className="p-4 border-b border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-medium text-white">Gestión de Servicios</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="text-xs text-gray-500 bg-[#1e1e1e] border-b border-[#2a2a2a] uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Cliente</th>
                    <th className="px-6 py-4 font-semibold">DNI / WhatsApp</th>
                    <th className="px-6 py-4 font-semibold">Dispositivo</th>
                    <th className="px-6 py-4 font-semibold">Tipo de Servicio</th>
                    <th className="px-6 py-4 font-semibold">Estado</th>
                    <th className="px-6 py-4 font-semibold">Fecha</th>
                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2a]">
                  {servicios.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        No hay servicios registrados.
                      </td>
                    </tr>
                  ) : (
                    servicios.map((srv: any) => {
                      let stateColor = "text-gray-500";
                      let stateBg = "bg-gray-500";
                      
                      if (srv.estado === 'PENDIENTE') { stateColor = "text-red-500"; stateBg = "bg-red-500"; }
                      else if (srv.estado === 'PROCESO') { stateColor = "text-[#FFB800]"; stateBg = "bg-[#FFB800]"; }
                      else if (srv.estado === 'LISTO') { stateColor = "text-green-500"; stateBg = "bg-green-500"; }
                      else if (srv.estado === 'ENTREGADO') { stateColor = "text-gray-500"; stateBg = "border-2 border-gray-500"; }

                      return (
                        <tr key={srv.id} className="hover:bg-[#222] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-200">{srv.cliente.nombre}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-300">{srv.cliente.dni}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <span className="w-3 h-3 bg-green-500/20 text-green-500 rounded flex items-center justify-center text-[8px]">W</span>
                              {srv.cliente.telefono}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="inline-flex flex-col gap-1">
                              <span className="px-2 py-1 bg-[#2a2a2a] text-xs rounded-sm text-gray-300 border border-[#333]">{srv.marca}</span>
                              <span className="px-2 py-1 bg-[#2a2a2a] text-xs rounded-sm text-gray-400 border border-[#333]">{srv.modelo}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-1 h-4 rounded-sm ${stateBg}`}></div>
                              <span className="font-medium text-xs uppercase tracking-wider">{srv.tipo_servicio}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`flex items-center gap-2 text-xs font-bold tracking-wider ${stateColor}`}>
                              <div className={`w-2 h-2 rounded-full ${stateBg === 'border-2 border-gray-500' ? 'border-2 border-gray-500' : stateBg}`}></div>
                              {srv.estado}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-300">{srv.fecha_registro.toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link href={`/seguimiento/${srv.uuid_seguimiento}`} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <Eye size={16} />
                              </Link>
                              <Link href={`/editar/${srv.id}`} className="text-gray-400 hover:text-white transition-colors">
                                <Edit2 size={16} />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
            
            {servicios.length > 0 && (
              <div className="p-4 border-t border-[#2a2a2a] flex items-center justify-between text-xs text-gray-500">
                <span>MOSTRANDO {servicios.length} SERVICIOS</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
