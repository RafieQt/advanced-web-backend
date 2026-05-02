import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  orderDate: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders, {
    onDelete: 'CASCADE',
  })
  customer: CustomerEntity;
}
