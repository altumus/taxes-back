import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/clients.dto';
import { ClientsType } from '@prisma/client';

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

  async createClient(dto: CreateClientDto) {
    const createdClient = await this.prisma.client.create({
      data: {
        name: dto.name,
        clientType: ClientsType[dto.clientType],
        email: dto.email,
        inn: dto.inn,
        phone: dto.phone,
      },
    });
    return createdClient;
  }
}
