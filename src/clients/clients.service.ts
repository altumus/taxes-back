import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getClientsByInspectionId(inspectionId: number) {
    const clients = await this.prisma.organization.findMany({
      where: {
        inspectionId,
      },
      include: {
        Client: true,
      },
    });

    return clients;
  }
}
