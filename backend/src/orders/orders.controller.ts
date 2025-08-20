import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';
import { Role } from '../../generated/prisma';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @User() user: any,
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get('my')
  findMyOrders(@User() user: any) {
    return this.ordersService.findUserOrders(user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }
}
