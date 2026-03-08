import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

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
  @BeforeInsert()
  generateId() {
    this.id = 'cust_' + Math.random().toString(36).substring(2, 10);
  }
}
