import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditClientPage from "./EditClientPage";

export default async function EditarPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const id = parseInt(resolvedParams.id, 10);
  
  if (isNaN(id)) {
    notFound();
  }

  const servicioRaw = await prisma.servicio.findUnique({
    where: { id },
    include: { cliente: true }
  });

  if (!servicioRaw) {
    notFound();
  }

  // Serialize the decimal before passing to the Client Component
  const servicio = {
    ...servicioRaw,
    costo_total: servicioRaw.costo_total ? servicioRaw.costo_total.toString() : null,
  };

  return <EditClientPage servicio={servicio} />;
}
