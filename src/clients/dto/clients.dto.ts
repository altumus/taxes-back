import { IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNumber()
  inspectionId: number;

  @IsString()
  inn: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  clientType: string;

  @IsString()
  name: string;
}
