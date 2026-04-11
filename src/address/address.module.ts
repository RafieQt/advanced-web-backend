import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressEntity } from './address.entity';
import { CustomerEntity } from '../customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, CustomerEntity])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
