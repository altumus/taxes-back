import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import {
  CreateClientDto,
  CreateOrganizationDto,
  CreatePaymentDto,
} from './dto/clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('all-clients/:inspectionId')
  getAllClientsByInspection(@Param('inspectionId') inspectionId: number) {
    return this.clientsService.getClientsByInspectionId(Number(inspectionId));
  }

  @Post('add-client')
  createClient(@Body() dto: CreateClientDto) {
    return this.clientsService.createClient(dto);
  }

  @Post('add-organization')
  createOrganization(@Body() dto: CreateOrganizationDto) {
    return this.clientsService.createOrganization(dto);
  }

  @Post('add-payment')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.clientsService.createPayment(dto);
  }
}
