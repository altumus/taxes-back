import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService],
})
export class ClientsModule {}
