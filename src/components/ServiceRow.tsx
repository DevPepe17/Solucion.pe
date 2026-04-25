"use client";

import { Eye, Edit2, Check, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { actualizarEstado } from "@/lib/actions/service.actions";
import { useRouter } from "next/navigation";

export default function ServiceRow({ srv }: { srv: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [estado, setEstado] = useState(srv.estado);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  let stateColor = "text-gray-500";
  let stateBg = "bg-gray-500";
  
  if (srv.estado === 'PENDIENTE') { stateColor = "text-red-500"; stateBg = "bg-red-500"; }
  else if (srv.estado === 'PROCESO') { stateColor = "text-[#FFB800]"; stateBg = "bg-[#FFB800]"; }
  else if (srv.estado === 'LISTO') { stateColor = "text-green-500"; stateBg = "bg-green-500"; }
  else if (srv.estado === 'ENTREGADO') { stateColor = "text-gray-500"; stateBg = "border-2 border-gray-500"; }

  const handleSave = async () => {
    setIsSaving(true);
    await actualizarEstado(srv.id, estado);
    setIsSaving(false);
    setIsEditing(false);
    router.refresh();
  };

  return (
    <tr className="hover:bg-[#222] transition-colors group">
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
        {isEditing ? (
          <select 
            value={estado} 
            onChange={(e) => setEstado(e.target.value)}
            className="bg-[#1a1a1a] border border-[#333] text-white rounded-sm px-2 py-1 text-xs focus:outline-none focus:border-[#FFB800]"
          >
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="PROCESO">PROCESO</option>
            <option value="LISTO">LISTO</option>
            <option value="ENTREGADO">ENTREGADO</option>
          </select>
        ) : (
          <div className={`flex items-center gap-2 text-xs font-bold tracking-wider ${stateColor}`}>
            <div className={`w-2 h-2 rounded-full ${stateBg === 'border-2 border-gray-500' ? 'border-2 border-gray-500' : stateBg}`}></div>
            {srv.estado}
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="text-gray-300">{new Date(srv.fecha_registro).toLocaleDateString()}</div>
      </td>
      <td className="px-6 py-4 text-right">
        {isEditing ? (
          <div className="flex justify-end gap-3">
            <button onClick={handleSave} disabled={isSaving} className="text-green-500 hover:text-green-400 transition-colors">
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            </button>
            <button onClick={() => setIsEditing(false)} disabled={isSaving} className="text-red-500 hover:text-red-400 transition-colors">
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/seguimiento/${srv.uuid_seguimiento}`} target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <Eye size={16} />
            </Link>
            <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-white transition-colors">
              <Edit2 size={16} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
