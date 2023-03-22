import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number, password: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        password,
      },
    });
  }

  async deleteUser(id: number, login: string) {
    return this.prisma.user.delete({
      where: {
        id,
        login,
      },
    });
  }
}
