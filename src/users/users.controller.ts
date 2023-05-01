import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, EditUserDto } from './dto/users.dto';
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

  @Get('all-users/:inspectionId')
  getAllUsers(@Param('inspectionId') inspectionId: number) {
    return this.usersService.getAllUsers(Number(inspectionId));
  }

  @Delete('delete-user/:userId')
  deleteUser(@Param('userId') userId: number) {
    return this.usersService.deleteUser(Number(userId));
  }

  @Patch('edit-user')
  editUser(@Body() dto: EditUserDto) {
    return this.usersService.editUser(dto);
  }
}
