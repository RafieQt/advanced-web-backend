import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomerDTO } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  //create user
  async createUser(customer: CustomerDTO): Promise<CustomerEntity> {
    const newCustomer = this.customerRepository.create(customer);
    return this.customerRepository.save(newCustomer);
  }

  //get users with fullname substring
  async getUserByFullname(fullname: string): Promise<CustomerEntity[]> {
    const customer = await this.customerRepository.findOneBy({ fullname });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return this.customerRepository.find({
      where: {
        fullname: Like(`%${fullname}%`),
      },
    });
  }
  //get user by their username
  async getUserByUsername(username: string): Promise<CustomerEntity | null> {
    const customer = await this.customerRepository.findOneBy({ username });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return this.customerRepository.findOneBy({ username });
  }

  //delete user by their username
  async deleteUserByUsername(username: string): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ username });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    await this.customerRepository.delete({ username });
  }
  // customer by their id
  getById(id: string): object {
    return this.customerRepository.findOneBy({ id });
  }

  async update(id: string, data: CustomerDTO): Promise<CustomerEntity | null> {
    await this.customerRepository.update(id, data);
    return this.customerRepository.findOneBy({ id: id });
  }

  async getByEmail(email: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneBy({ email });
    console.log('customer:', customer);
    if (!email) {
      throw new NotFoundException(
        `Customer with ${email} is not in the database.`,
      );
    }
    return customer!;
  }

  async partialUpdate(
    id: string,
    data: Partial<CustomerDTO>,
  ): Promise<CustomerEntity | null> {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    delete data.email;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    Object.assign(customer, data);

    return this.customerRepository.save(customer);
  }
  // update(id: string, data: CustomerDTO): object {
  //   return { id: id, updatedData: data, message: 'customer fully updated' };
  // }

  async findOne(username: string): Promise<CustomerEntity | null> {
    return this.customerRepository.findOneBy({ email: username });
  }
}
