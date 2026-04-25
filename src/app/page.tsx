"use client";

import { Shield, Loader2 } from "lucide-react";
import { useActionState } from "react";
import Image from "next/image";
import { validarLogin } from "@/lib/actions/auth.actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(validarLogin, null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4" style={{
      backgroundImage: `radial-gradient(#333 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}>
      <div className="w-full max-w-md bg-[#161616] border border-[#2a2a2a] rounded-sm p-8 shadow-2xl relative overflow-hidden">
        {/* Top yellow accent border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="Solucion.pe" 
              width={160} 
              height={160} 
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">ACCESO ADMINISTRATIVO</h1>
          <p className="text-sm text-gray-400 mt-1">Gestión Técnica Solucion.pe</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                name="email"
                type="email" 
                placeholder="admin@solucion.pe" 
                required
                className="w-full pl-10 pr-3 py-2.5 bg-[#0d0d0d] border border-[#333] rounded-sm text-white focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Contraseña
              </label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                ¿OLVIDÓ SU CLAVE?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                name="password"
                type="password" 
                placeholder="••••••••" 
                required
                className="w-full pl-10 pr-3 py-2.5 bg-[#0d0d0d] border border-[#333] rounded-sm text-white focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input 
              id="remember-me" 
              name="remember"
              type="checkbox" 
              className="h-4 w-4 bg-[#0d0d0d] border-[#333] rounded-sm text-[#FFB800] focus:ring-[#FFB800] focus:ring-offset-[#161616]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 cursor-pointer">
              Mantener sesión iniciada
            </label>
          </div>

          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
              <p className="text-sm text-red-400 text-center">{state.error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-black bg-[#FFB800] hover:bg-[#e6a600] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB800] focus:ring-offset-[#161616] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#2a2a2a] flex items-center justify-center text-xs text-gray-500">
          <Shield className="h-4 w-4 mr-1 opacity-50" />
          <span>CONEXIÓN ENCRIPTADA DE ALTA SEGURIDAD</span>
        </div>
      </div>

      <div className="w-full max-w-md mt-4 flex justify-between text-[10px] text-gray-500 uppercase tracking-widest">
        <div className="flex items-center">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
          SERVIDORES ONLINE
        </div>
        <div>V2.4.0-STABLE</div>
      </div>
    </div>
  );
}
