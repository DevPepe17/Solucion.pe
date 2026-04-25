"use server"

import prisma from "../prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function validarLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Por favor, ingresa correo y contraseña" }
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { usuario: email },
    })

    if (!usuario) {
      return { error: "Credenciales incorrectas" }
    }

    // Nota: Para un entorno de producción, aquí se usaría bcrypt.compare
    if (usuario.password !== password) {
      return { error: "Credenciales incorrectas" }
    }

    // Establecer una cookie simple para simular la sesión
    const cookieStore = await cookies()
    cookieStore.set("admin_session", usuario.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    })

  } catch (error) {
    console.error("Error validando login:", error)
    return { error: "Error interno del servidor" }
  }

  // Redirigir fuera del bloque try-catch
  redirect("/dashboard")
}

export async function cerrarSesion() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/")
}
