import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(login: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
        password,
      },
    });
    if (user) {
      return user;
    }
    throw new ForbiddenException('Unauthorized');
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
