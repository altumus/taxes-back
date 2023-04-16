import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateClientDto,
  CreateOrganizationDto,
  CreatePaymentDto,
} from './dto/clients.dto';
import { ClientsType } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getClientsByInspectionId(inspectionId: number) {
    const clients = await this.prisma.client.findMany({
      where: {
        organizations: {
          every: {
            inspectionId,
          },
        },
      },
      include: {
        organizations: true,
        TaxesPayment: {
          select: {
            id: true,
            paymentDate: true,
            nextPaymentDate: true,
            income: true,
          },
        },
      },
    });

    return clients;
  }

  async createClient(dto: CreateClientDto) {
    const foundClient = await this.prisma.client.findFirst({
      where: {
        inn: dto.inn,
      },
    });
    if (foundClient) {
      return foundClient;
    }

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

  async createOrganization(dto: CreateOrganizationDto) {
    try {
      const organization = await this.prisma.organization.create({
        data: {
          name: dto.name,
          organizationInn: dto.organizationInn,
          organizationKpp: dto.organizationKpp,
          organizationOgrn: dto.organizationOgrn,
          ownerPosition: dto.ownerPosition,
          clientId: dto.clientId,
          inspectionId: dto.inspectionId,
          organizationPhysicalAddress: dto.organizationPhysicalAddress,
          organizationJuridicalAddress: dto.organizationJuridicalAddress,
          taxesTypeId: dto.taxesTypeId,
        },
      });
      return organization;
    } catch (error) {
      return error;
    }
  }

  async createPayment(dto: CreatePaymentDto) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let nextPaymentDate;
    switch (true) {
      case currentMonth <= 2:
        nextPaymentDate = new Date(`05-25-${currentYear}`);
        break;
      case currentMonth <= 8:
        nextPaymentDate = new Date(`11-25-${currentYear}`);
        break;
    }
    const payment = this.prisma.taxesPayment.create({
      data: {
        income: dto.income,
        clientId: dto.clientId,
        nextPaymentDate: nextPaymentDate,
        organizationId: dto.organizationId,
      },
    });
    return payment;
  }
}
