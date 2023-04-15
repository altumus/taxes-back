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

export class CreateOrganizationDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  organizationInn: string;

  @IsString()
  organizationKpp: string;

  @IsString()
  organizationOgrn: string;

  @IsString()
  organizationPhysicalAddress: string;

  @IsString()
  organizationJuridicalAddress: string;

  @IsString()
  ownerPosition: string;

  @IsNumber()
  inspectionId: number;

  @IsNumber()
  taxesTypeId: number;

  @IsNumber()
  income: number;

  @IsNumber()
  clientId: number;
}
