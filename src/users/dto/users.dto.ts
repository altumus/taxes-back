import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  type: string;

  @IsNumber()
  inspectionId: number;
}

export class EditUserDto {
  @IsNumber()
  id: number;

  @IsString()
  login: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
