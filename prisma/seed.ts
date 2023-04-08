import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
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
        type: 'USN_INCOMING_MINUS_IP',
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
  });
}
main()
  .then(() => {
    console.log('seed done');
  })
  .catch(() => {
    console.log('seed failed');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
