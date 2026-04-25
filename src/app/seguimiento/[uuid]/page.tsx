import { Bell, Settings, User, Monitor, AlertCircle, Wrench, ShieldCheck, LifeBuoy } from "lucide-react";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SeguimientoPage({ params }: { params: { uuid: string } }) {
  // Use Promise.resolve or await based on Next.js 15+ changes, but for Next 14 standard params is acceptable, however it's a good practice to await it in Next 15.
  // Next 14 handles it fine without await.
  const resolvedParams = await Promise.resolve(params);
  
  const servicio = await prisma.servicio.findUnique({
    where: { uuid_seguimiento: resolvedParams.uuid },
    include: { cliente: true }
  });

  if (!servicio) {
    notFound();
  }

  let stateColor = "text-gray-500";
  let stateBg = "bg-gray-500";
  let pulse = "";
  
  if (servicio.estado === 'PENDIENTE') { stateColor = "text-red-500"; stateBg = "bg-red-500"; pulse = "animate-pulse"; }
  else if (servicio.estado === 'PROCESO') { stateColor = "text-[#FFB800]"; stateBg = "bg-[#FFB800]"; pulse = "animate-pulse"; }
  else if (servicio.estado === 'LISTO') { stateColor = "text-green-500"; stateBg = "bg-green-500"; }
  else if (servicio.estado === 'ENTREGADO') { stateColor = "text-gray-500"; stateBg = "bg-gray-500"; }

  const estimatedDate = servicio.fecha_entrega 
    ? servicio.fecha_entrega.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase()
    : 'POR CONFIRMAR';

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 bg-[#121212] border-b border-[#222] flex items-center justify-between px-6 shrink-0">
        <div>
          <h1 className="text-[#FFB800] font-bold text-xl tracking-wider">SOLUCION.PE</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Technical Management</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-6 mt-4">
          
          {/* Status Banner */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${stateBg}`} />
            <div>
              <p className={`text-xs font-bold ${stateColor} uppercase tracking-widest mb-2`}>ORDEN #{servicio.id.toString().padStart(4, '0')}-X</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">ESTADO: {servicio.estado}</h1>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stateBg} ${pulse}`} />
                <p className="text-gray-400 text-sm">
                  {servicio.estado === 'PENDIENTE' && 'Tu equipo está en cola para ser revisado.'}
                  {servicio.estado === 'PROCESO' && 'Tu equipo está siendo intervenido por un especialista.'}
                  {servicio.estado === 'LISTO' && 'Tu equipo está reparado y listo para ser recogido.'}
                  {servicio.estado === 'ENTREGADO' && 'Este equipo ya fue entregado al cliente.'}
                </p>
              </div>
            </div>
            
            <div className="bg-[#121212] border border-[#333] p-4 rounded-sm min-w-[160px] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#333] group-hover:bg-[#FFB800] transition-colors" />
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">FECHA ESTIMADA</p>
              <p className="text-xl font-bold text-[#FFB800]">{estimatedDate}</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Client & Device */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 flex flex-col justify-center space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#FFB800]"><User size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CLIENTE</p>
                  <p className="text-white text-sm font-medium">{servicio.cliente.nombre}</p>
                </div>
              </div>
              <div className="w-full h-px bg-[#2a2a2a]" />
              <div className="flex items-start gap-4">
                <div className="mt-1 text-blue-400"><Monitor size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">DISPOSITIVO</p>
                  <p className="text-white text-sm font-medium">{servicio.marca} {servicio.modelo}</p>
                  {servicio.especificaciones && (
                    <p className="text-xs text-gray-500 mt-0.5">{servicio.especificaciones}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Problem Details */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#333]" />
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">PROBLEMA REPORTADO</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {servicio.problema || "No especificado"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                  <p className="text-[10px] font-bold text-[#FFB800] uppercase tracking-widest">OBSERVACIONES TÉCNICAS</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {servicio.observaciones || "Pendiente de evaluación técnica."}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm p-6 sm:p-10">
            <p className="text-xs font-bold text-white uppercase tracking-widest text-center mb-10">HISTORIAL DEL SERVICIO</p>
            
            <div className="max-w-3xl mx-auto relative">
              {/* Central Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#333] -translate-x-1/2" />

              {/* Event 1 */}
              <div className="relative flex justify-between items-center w-full mb-8 group">
                <div className="w-5/12 text-right pr-6">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {servicio.fecha_registro.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
                  </p>
                </div>
                <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#555] ${servicio.estado !== 'PENDIENTE' ? 'bg-[#1a1a1a] border-gray-300' : 'bg-[#FFB800] border-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.5)]'} z-10 transition-colors`} />
                <div className="w-5/12 pl-6">
                  <div className={`bg-[#121212] border ${servicio.estado === 'PENDIENTE' ? 'border-[#FFB800]' : 'border-[#333]'} p-4 rounded-sm transition-colors`}>
                    <p className={`text-sm font-bold ${servicio.estado === 'PENDIENTE' ? 'text-[#FFB800]' : 'text-white'} mb-1`}>Equipo Recibido</p>
                    <p className="text-xs text-gray-400">Ingreso a taller central para evaluación inicial.</p>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              {servicio.estado !== 'PENDIENTE' && (
                <div className="relative flex justify-between items-center w-full mb-8 group">
                  <div className="w-5/12 pr-6">
                    <div className={`bg-[#121212] border ${servicio.estado === 'PROCESO' ? 'border-[#FFB800]' : 'border-[#333]'} p-4 rounded-sm text-right transition-colors`}>
                      <p className={`text-sm font-bold ${servicio.estado === 'PROCESO' ? 'text-[#FFB800]' : 'text-white'} mb-1`}>En Intervención</p>
                      <p className="text-xs text-gray-400">El equipo está siendo reparado por un técnico.</p>
                    </div>
                  </div>
                  <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#555] ${servicio.estado === 'PROCESO' ? 'bg-[#FFB800] border-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.5)]' : 'bg-[#1a1a1a] border-gray-300'} z-10 transition-colors`} />
                  <div className="w-5/12 pl-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">ACTUAL</p>
                  </div>
                </div>
              )}

              {/* Event 3 */}
              {(servicio.estado === 'LISTO' || servicio.estado === 'ENTREGADO') && (
                <div className="relative flex justify-between items-center w-full group">
                  <div className="w-5/12 text-right pr-6">
                    <p className="text-[10px] font-bold text-[#FFB800] uppercase tracking-widest">FINALIZADO</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500 border-green-500 shadow-[0_0_10px_rgba(76,175,80,0.5)] z-10" />
                  <div className="w-5/12 pl-6">
                    <div className="bg-[#121212] border border-green-500 p-4 rounded-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                      <p className="text-sm font-bold text-green-500 mb-1">Equipo Listo</p>
                      <p className="text-xs text-gray-300">El servicio técnico ha finalizado exitosamente.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#121212] border-t border-[#222] py-12 shrink-0">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-[#FFB800] font-bold text-2xl tracking-widest mb-2">SOLUCION.PE</h2>
          <p className="text-gray-500 italic text-sm mb-8">"Tu laptop en buenas manos"</p>
          
          <div className="flex gap-12 mb-12">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="text-[#FFB800]" size={24} />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">GARANTÍA TÉCNICA</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LifeBuoy className="text-blue-400" size={24} />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SOPORTE 24/7</p>
            </div>
          </div>
          
          <div className="w-full h-px bg-[#222] mb-6" />
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2023 SOLUCION.PE - GESTIÓN TÉCNICA AVANZADA</p>
        </div>
      </footer>
    </div>
  );
}
