"use server"

import prisma from "../prisma"
import { redirect } from "next/navigation"

export async function validarClientePorDni(dni: string) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { dni },
    })
    return { success: !!cliente, cliente }
  } catch (error) {
    return { success: false, message: "Error al validar cliente" }
  }
}

export async function registrarServicioForm(prevState: any, formData: FormData) {
    try {
        const dni = formData.get("dni") as string;
        const nombre = formData.get("nombre") as string;
        const telefono = formData.get("telefono") as string;
        
        const tipo_equipo = formData.get("tipo_equipo") as string;
        const marca = formData.get("marca") as string;
        const modelo = formData.get("modelo") as string;
        const especificaciones = formData.get("especificaciones") as string;
        
        const tipo_servicio = formData.get("tipo_servicio") as string;
        const problema = formData.get("problema") as string;
        const observaciones = formData.get("observaciones") as string;
        const costo_total = formData.get("costo_total") as string;
        const fecha_entrega = formData.get("fecha_entrega") as string;

        if (!dni || !nombre || !tipo_equipo || !marca || !tipo_servicio || !problema) {
          return { error: "Faltan campos obligatorios" };
        }

        // Upsert cliente
        const cliente = await prisma.cliente.upsert({
            where: { dni },
            update: { nombre, telefono },
            create: { dni, nombre, telefono }
        });

        const servicio = await prisma.servicio.create({
            data: {
                dni_cliente: cliente.dni,
                tipo_equipo,
                marca,
                modelo,
                especificaciones: especificaciones || "",
                tipo_servicio,
                problema,
                observaciones: observaciones || "",
                costo_total: costo_total ? parseFloat(costo_total) : null,
                fecha_entrega: fecha_entrega ? new Date(fecha_entrega) : null
            }
        });

    } catch (error) {
        console.error("Error registrando servicio:", error);
        return { error: "Error al registrar el servicio en la base de datos" };
    }
    
    redirect("/dashboard");
}

export async function actualizarServicioForm(id: number, prevState: any, formData: FormData) {
    try {
        const tipo_servicio = formData.get("tipo_servicio") as string;
        const problema = formData.get("problema") as string;
        const observaciones = formData.get("observaciones") as string;
        const costo_total = formData.get("costo_total") as string;
        const fecha_entrega = formData.get("fecha_entrega") as string;
        const estado = formData.get("estado") as any;

        if (!tipo_servicio || !problema) {
          return { error: "Faltan campos obligatorios" };
        }

        const servicio = await prisma.servicio.update({
            where: { id },
            data: {
                tipo_servicio,
                problema,
                observaciones: observaciones || "",
                costo_total: costo_total ? parseFloat(costo_total) : null,
                fecha_entrega: fecha_entrega ? new Date(fecha_entrega) : null,
                estado: estado || 'PENDIENTE'
            }
        });

    } catch (error) {
        console.error("Error actualizando servicio:", error);
        return { error: "Error al actualizar el servicio en la base de datos" };
    }
    
    redirect("/dashboard");
}

export async function eliminarServicio(id: number) {
    try {
        await prisma.servicio.delete({
            where: { id }
        });
    } catch (error) {
        console.error("Error eliminando servicio:", error);
        return { error: "Error al eliminar el servicio" };
    }
    redirect("/dashboard");
}

export async function actualizarEstado(id: number, estado: "PENDIENTE" | "PROCESO" | "LISTO" | "ENTREGADO") {
  try {
    const servicio = await prisma.servicio.update({
      where: { id },
      data: { estado }
    })
    return { success: true, servicio }
  } catch (error) {
    console.error("Error actualizando estado:", error)
    return { success: false, message: "Error al actualizar estado" }
  }
}
