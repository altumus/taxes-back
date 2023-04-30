import { IsBoolean, IsNumber, IsString } from 'class-validator';

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
  clientId: number;
}

export class CreatePaymentDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  organizationId: number;

  @IsNumber()
  income: number;
}

export class CreateSuccessPaymentDto {
  @IsNumber()
  organizationId: number;

  @IsString()
  payment: string;
}

export class EditClientDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  inn: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  clientType: string;

  @IsBoolean()
  isArchived: boolean;
}
