import { Controller, Get, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  @Get('all-clients/:inspectionId')
  getAllClientsByInspection(@Param('inspectionId') inspectionId: number) {
    return this.clientsService.getClientsByInspectionId(Number(inspectionId));
  }
}
