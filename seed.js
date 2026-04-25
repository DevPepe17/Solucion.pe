const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.usuario.upsert({
    where: { usuario: 'admin@solucion.pe' },
    update: {},
    create: {
      usuario: 'admin@solucion.pe',
      password: 'adminpassword123', // En un entorno real esto debería estar hasheado con bcrypt
      nombre: 'Administrador Principal',
    },
  });

  console.log('Usuario creado exitosamente:');
  console.log(adminUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
