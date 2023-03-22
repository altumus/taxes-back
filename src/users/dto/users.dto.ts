import { IsNumber, IsString } from 'class-validator';

export class GetUserDto {
  @IsNumber()
  id: number;
  @IsString()
  password: string;
}

export class DeleteUserDto {
  @IsNumber()
  id: number;
  @IsString()
  login: string;
}
