import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const { productId, quantity } = createOrderDto;

    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.prisma.order.create({
      data: {
        userId,
        productId,
        quantity,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async findUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
