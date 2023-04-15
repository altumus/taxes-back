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
      include: {
        Inspections: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
    if (user) {
      const formattedUser = {
        id: user.id,
        inspectionId: user.inspectionId,
        login: user.login,
        name: user.name,
        password: user.password,
        type: user.type,
        inspectionCode: user.Inspections.code,
        inspectionName: user.Inspections.name,
      };
      return formattedUser;
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
