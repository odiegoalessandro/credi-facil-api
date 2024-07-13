import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(private prismaService: PrismaService) {}

  async create(createSellerDto: CreateSellerDto) {
    return await this.prismaService.seller.create({
      data: createSellerDto,
    });
  }

  async findAll() {
    return await this.prismaService.seller.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.seller.findUnique({ where: { id } });
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    return await this.prismaService.seller.update({
      data: updateSellerDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prismaService.seller.delete({
      where: { id },
    });
  }

  async existsWithName(name: string) {
    const sellerExists = await this.prismaService.seller.findUnique({
      where: {
        name,
      },
    });

    return sellerExists !== null;
  }
}
