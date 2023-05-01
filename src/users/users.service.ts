import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, EditUserDto } from './dto/users.dto';

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

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async addUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        login: dto.login,
        name: dto.name,
        password: dto.password,
        inspectionId: dto.inspectionId,
        type: UsersType[dto.type],
      },
    });
  }

  async checkUser(login: string) {
    return this.prisma.user.findFirst({
      where: {
        login: login,
      },
    });
  }

  async getAllUsers(inspectionId: number) {
    return this.prisma.user.findMany({
      where: {
        inspectionId: inspectionId,
      },
    });
  }

  async editUser(dto: EditUserDto) {
    return this.prisma.user.update({
      where: {
        id: dto.id,
      },
      data: {
        login: dto.login,
        name: dto.name,
        password: dto.password,
      },
    });
  }
}
