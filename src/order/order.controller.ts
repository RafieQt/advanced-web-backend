import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './order.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create order
  // {
  //   "productName": "Laptop",
  //   "totalAmount": 999.99,
  //   "customerId": "cust_abc123",
  //   "status": "pending"
  // }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createOrder(@Body() orderData: OrderDTO) {
    return this.orderService.createOrder(orderData);
  }

  // Get orders by customer ID(works)
  @Get('customer/:customerId')
  getOrdersByCustomer(@Param('customerId') customerId: string) {
    return this.orderService.getOrdersByCustomer(customerId);
  }

  // Delete order
  @Delete('delete/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
