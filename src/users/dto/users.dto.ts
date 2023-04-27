import { IsNumber, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsNumber()
  id: number;
  @IsString()
  login: string;
}

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
