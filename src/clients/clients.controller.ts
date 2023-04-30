import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import {
  CreateClientDto,
  CreateOrganizationDto,
  CreatePaymentDto,
  CreateSuccessPaymentDto,
  EditClientDto,
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

  @Get('client-info/:inspectionId/:clientId')
  getClientInfo(
    @Param('inspectionId') inspectionId: number,
    @Param('clientId') clientId: number,
  ) {
    return this.clientsService.getClientInfo(
      Number(inspectionId),
      Number(clientId),
    );
  }

  @Delete('delete-client/:clientId')
  deleteClient(@Param('clientId') clientId: number) {
    return this.clientsService.deleteClient(Number(clientId));
  }

  @Post('add-success-payment')
  createSuccessPayment(@Body() dto: CreateSuccessPaymentDto) {
    return this.clientsService.createSuccessPayment(
      dto.organizationId,
      dto.payment,
    );
  }

  @Post('add-payment')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.clientsService.createPayment(dto);
  }

  @Patch('return-client/:clientId')
  returnClient(@Param('clientId') clientId: number) {
    return this.clientsService.returnClient(Number(clientId));
  }

  @Patch('edit-client')
  editClient(@Body() dto: EditClientDto) {
    return this.clientsService.editClient(dto);
  }
}
