import { Body, Controller, Delete, Get } from '@nestjs/common';
import { DeleteUserDto, GetUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  getUser(@Body() dto: GetUserDto) {
    return this.usersService.getUser(dto.id, dto.password);
  }

  @Delete('user')
  deleteUser(@Body() dto: DeleteUserDto) {
    this.usersService.deleteUser(dto.id, dto.login);
  }
}
