import { Injectable } from '@nestjs/common';
import { CustomerDTO } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  //create user
  async createUser(customer: CustomerEntity): Promise<CustomerEntity> {
    const newCustomer = this.customerRepository.create(customer);
    return this.customerRepository.save(newCustomer);
  }

  //get users with fullname substring
  async getUserByFullname(fullname: string): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: {
        fullname: Like(`%${fullname}%`),
      },
    });
  }
  //get user by their username
  async getUserByUsername(username: string): Promise<CustomerEntity | null> {
    return this.customerRepository.findOneBy({ username });
  }

  //delete user by their username
  async deleteUserByUsername(username: string): Promise<void> {
    await this.customerRepository.delete({ username });
  }

  getById(id: string): object {
    return { id: id, status: 'found' };
  }

  createCustomer(data: CustomerDTO): object {
    return { data, message: 'customer created' };
  }

  update(id: string, data: CustomerDTO): object {
    return { id: id, updatedData: data, message: 'customer fully updated' };
  }

  partialUpdate(id: string, data: CustomerDTO): object {
    return { id: id, partialData: data, message: 'customer patched' };
  }

  getByEmail(email: string): object {
    return { email: email, message: 'customer found by email' };
  }
}
