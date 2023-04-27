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
            mustPay: true,
          },
        },
      },
    });

    const taxesPaymentSuccess = await this.prisma.taxesSuccessPayment.findMany(
      {},
    );

    const findOwe = (organizationId: number, clientId: number) => {
      const mappedSuccess = taxesPaymentSuccess.filter(
        (taxes) => taxes.organizationId === organizationId,
      );

      let payedSum = 0;

      for (let i = 0; i < mappedSuccess.length; i++) {
        payedSum += Number(mappedSuccess[i].paymentSum);
      }

      const mappedPayments = clients.filter((client) => client.id === clientId);

      let paymentSum = 0;

      for (let i = 0; i < mappedPayments.length; i++) {
        for (let j = 0; j < mappedPayments[i].TaxesPayment.length; j++) {
          paymentSum += Number(mappedPayments[i].TaxesPayment[j].income);
        }
      }

      return payedSum < paymentSum;
    };

    const flattenedClients = clients.map((client) => ({
      id: client.id,
      clientType: client.clientType,
      dateCreate: client.dateCreate,
      email: client.email,
      inn: client.inn,
      name: client.name,
      organizations: client.organizations,
      phone: client.phone,
      TaxesPayment: client.TaxesPayment,
      haveOwe: client.organizations.map((organization) =>
        findOwe(organization.id, organization.clientId),
      )[0],
      isArchived: client.isArchived,
    }));
    return flattenedClients;
  }

  async getClientInfo(inspectionId: number, clientId: number) {
    return this.prisma.client.findFirst({
      where: {
        id: clientId,
        organizations: {
          every: {
            inspectionId,
          },
        },
      },
      include: {
        organizations: {
          include: {
            TaxesSuccessPayment: true,
            TaxesPayment: true,
          },
        },
      },
    });
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
    const found = await this.prisma.organization.findFirst({
      where: {
        organizationOgrn: dto.organizationOgrn,
        organizationInn: dto.organizationInn,
      },
    });

    if (found) {
      return { status: 'exists' };
    } else {
      await this.prisma.organization.create({
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
      return {
        status: 'created',
      };
    }
  }

  async createPayment(dto: CreatePaymentDto) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let nextPaymentDate;
    switch (true) {
      case currentMonth <= 2:
        nextPaymentDate = new Date(`02-25-${currentYear}`);
        break;
      case currentMonth <= 5:
        nextPaymentDate = new Date(`5-25-${currentYear}`);
        break;
      case currentMonth <= 8:
        nextPaymentDate = new Date(`8-25-${currentYear}`);
        break;
      default:
        nextPaymentDate = new Date(`11-25-${currentYear + 1}`);
    }
    const paymentBid = await this.prisma.organization.findFirst({
      where: {
        id: dto.organizationId,
      },
      include: {
        taxesType: {
          select: {
            bid: true,
          },
        },
      },
    });

    const mustPay = (paymentBid.taxesType.bid / 100) * dto.income;
    const payment = await this.prisma.taxesPayment.create({
      data: {
        income: dto.income,
        clientId: dto.clientId,
        nextPaymentDate: nextPaymentDate,
        organizationId: dto.organizationId,
        mustPay: mustPay.toFixed(2),
      },
    });
    return payment;
  }

  async createSuccessPayment(organizationId: number, payment: string) {
    return this.prisma.taxesSuccessPayment.create({
      data: {
        organizationId,
        paymentSum: payment,
      },
    });
  }

  async deleteClient(clientId: number) {
    return this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        isArchived: true,
      },
    });
  }

  async returnClient(clientId: number) {
    return this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        isArchived: false,
      },
    });
  }
}
