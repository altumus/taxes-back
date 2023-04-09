import { IsNumber, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsNumber()
  id: number;
  @IsString()
  login: string;
}
