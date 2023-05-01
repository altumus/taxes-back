import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Заполнение типа налогов
  await prisma.taxesType.createMany({
    data: [
      {
        type: 'USN_INCOMING_IP',
        bid: 6,
      },
      {
        type: 'USN_INCOMING_MINUS_IP',
        bid: 15,
      },
      {
        type: 'PSN',
        bid: 6,
      },
      {
        type: 'NPM',
        bid: 4,
      },
      {
        type: 'USN_INCOMING_UL',
        bid: 6,
      },
      {
        type: 'USN_INCOMING_MINUS_UL',
        bid: 15,
      },
      {
        type: 'ORN_IP',
        bid: 13,
      },
      {
        type: 'ORN_UL',
        bid: 20,
      },
    ],
  }),
    // Заполнение инспекций
    await prisma.inspections.createMany({
      data: [
        {
          code: '0001',
          name: 'Ярославская налоговая инспекция "The World"',
        },
        {
          code: '0002',
          name: 'Московская налоговая инспекция "King Crimson"',
        },
        {
          code: '0003',
          name: 'Питерская налоговая инспекция "Made in Heaven"',
        },
      ],
    }),
    // Создание админов
    await prisma.user.create({
      data: {
        login: 'brunyhow@mail.ru',
        inspectionId: 1,
        name: 'Бухарин Максим Андреевич',
        type: 'ADMIN',
        password: '25d55ad283aa400af464c76d713c07ad',
      },
    });
  await prisma.user.create({
    data: {
      login: 'testmail@mail.ru',
      inspectionId: 2,
      name: 'Дионисович Дио Дионович',
      type: 'ADMIN',
      password: '25d55ad283aa400af464c76d713c07ad',
    },
  });
}
main()
  .then(() => {
    console.log('seed done');
  })
  .catch((error) => {
    console.log('seed failed');
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
