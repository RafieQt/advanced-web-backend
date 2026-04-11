import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { AddressDTO } from './address.dto';
import { CustomerEntity } from '../customer/customer.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  // Create address
  async createAddress(addressData: AddressDTO): Promise<AddressEntity> {
    const customer = await this.customerRepository.findOne({
      where: { id: addressData.customerId },
      relations: ['address'],
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.address) {
      throw new BadRequestException(
        'Customer already has an address. Use update instead.',
      );
    }

    const newAddress = this.addressRepository.create({
      ...addressData,
      customer: customer,
    });

    return this.addressRepository.save(newAddress);
  }

  // Get address by ID
  async getAddressById(id: number): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return address;
  }

  // Get address by customer ID
  async getAddressByCustomer(customerId: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });

    if (!address) {
      throw new NotFoundException(
        `Address for customer ${customerId} not found`,
      );
    }

    return address;
  }

  // Delete address
  async deleteAddress(id: number): Promise<void> {
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    await this.addressRepository.delete(id);
  }
}
