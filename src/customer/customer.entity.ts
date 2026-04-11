import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { OrderEntity } from 'src/order/order.entity';
import { AddressEntity } from 'src/address/address.entity';
@Entity('customer')
export class CustomerEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;
  @Column({ type: 'varchar', length: 150 })
  fullname: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];

  @OneToOne(() => AddressEntity, (address) => address.customer)
  address: AddressEntity;

  @BeforeInsert()
  async generateId() {
    this.id = 'cust_' + Math.random().toString(36).substring(2, 10);

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
