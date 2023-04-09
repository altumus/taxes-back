import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { DeleteUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/:login/:password')
  getUser(@Param('login') login: string, @Param('password') password: string) {
    return this.usersService.getUser(login, password);
  }

  @Delete('user')
  deleteUser(@Body() dto: DeleteUserDto) {
    this.usersService.deleteUser(dto.id, dto.login);
  }
}
