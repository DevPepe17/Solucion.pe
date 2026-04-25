<div align="center">
  <img src="public/logo.png" alt="SOLUCION.PE Logo" width="200" />
  <h1>🛠️ Sistema de Gestión Técnica - Solucion.pe</h1>
  <p><em>Un sistema moderno de administración de servicios y seguimiento técnico para talleres de reparación de equipos electrónicos.</em></p>
</div>

---

## 📖 Sobre el Proyecto

Este proyecto es un **Sistema de Gestión de Reparaciones** diseñado específicamente para centros de servicio técnico (inspirado en la operativa de galerías tecnológicas como Wilson en Lima, Perú). 

Permite a los técnicos y administradores registrar clientes, ingresar equipos a reparación, gestionar costos y fechas estimadas, y mantener un estricto control de los estados del servicio. A su vez, ofrece a los clientes una vista pública en tiempo real para hacer el **seguimiento del estado de su equipo** mediante un link único.

## ✨ Características Principales

- **🔐 Autenticación Administrativa:** Panel protegido por sesión de cookies para técnicos y administradores.
- **📊 Dashboard Interactivo:** Métricas en tiempo real (Total de servicios, Pendientes, Listos hoy) y tabla general de órdenes con colores dinámicos según el estado.
- **📝 Gestión de Órdenes (CRUD):** 
  - Validación de DNI de clientes para carga rápida de datos.
  - Creación de nuevos tickets detallando el problema y observaciones.
  - Edición protegida de detalles técnicos y actualización ágil del estado (`PENDIENTE`, `PROCESO`, `LISTO`, `ENTREGADO`).
  - Eliminación de registros.
- **🔗 Link Público de Seguimiento:** Vista de solo lectura generada con un identificador único (UUID) para que el cliente rastree su dispositivo, vea el historial de la reparación y la fecha de entrega sin necesidad de iniciar sesión.

## 💻 Stack Tecnológico

El sistema ha sido construido bajo las arquitecturas y prácticas más modernas de desarrollo web:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Base de Datos:** [PostgreSQL (Serverless via Neon)](https://neon.tech/)
- **ORM:** [Prisma v7](https://www.prisma.io/) (con `@prisma/adapter-pg`)
- **Autenticación:** Server Actions + Sesiones con cookies httpOnly.

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para correr el proyecto en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/ebussness-proyect.git
cd ebussness-proyect
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto y agrega tu cadena de conexión a PostgreSQL:
```env
DATABASE_URL="postgresql://usuario:password@host/neondb?sslmode=require"
```

### 4. Preparar la Base de Datos (Prisma)
Genera el cliente de Prisma y sube el esquema a la base de datos:
```bash
npx prisma generate
npx prisma db push
```

### 5. Sembrar el Usuario Administrador (Seed)
Ejecuta el script para crear el usuario administrador por defecto (`admin@solucion.pe` / `adminpassword123`):
```bash
npx tsx seed.ts
```

### 6. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

---

## 📸 Estructura de Vistas

- `/` : Login administrativo.
- `/dashboard` : Panel central de gestión de servicios.
- `/nuevo` : Formulario de ingreso de un nuevo equipo al taller.
- `/editar/[id]` : Pantalla de actualización de datos de un servicio existente.
- `/seguimiento/[uuid]` : Pantalla de tracking público para compartir con el cliente.

## 📄 Licencia

Este proyecto es de uso privado / propietario para la empresa **SOLUCION.PE**.
