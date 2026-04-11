import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderDTO } from './order.dto';
import { CustomerEntity } from '../customer/customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  // Create order
  async createOrder(orderData: OrderDTO): Promise<OrderEntity> {
    const customer = await this.customerRepository.findOneBy({
      id: orderData.customerId,
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const newOrder = this.orderRepository.create({
      ...orderData,
      customer: customer,
    });

    return this.orderRepository.save(newOrder);
  }

  // Get orders by customer ID
  async getOrdersByCustomer(customerId: string): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  // Delete order
  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.orderRepository.delete(id);
  }
}
