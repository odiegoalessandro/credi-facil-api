import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async existsByName(name: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { username: name },
    });

    return userExists !== null;
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        sellerId: createUserDto.sellerId,
        password: hashSync(createUserDto.password, 10),
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return await this.prismaService.user.findUnique({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
