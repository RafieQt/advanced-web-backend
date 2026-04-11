import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.address, {
    cascade: true,
  })
  @JoinColumn()
  customer: CustomerEntity;
}
