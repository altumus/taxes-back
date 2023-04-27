import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/:login/:password')
  getUser(@Param('login') login: string, @Param('password') password: string) {
    return this.usersService.getUser(login, password);
  }

  @Post('add-user')
  addUser(@Body() dto: CreateUserDto) {
    return this.usersService.addUser(dto);
  }

  @Get('check-user/:login')
  checkUser(@Param('login') login: string) {
    return this.usersService.checkUser(login);
  }

  @Delete('user')
  deleteUser(@Body() dto: DeleteUserDto) {
    this.usersService.deleteUser(dto.id, dto.login);
  }
}
