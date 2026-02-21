import { Injectable } from '@nestjs/common';
import { CustomerDTO } from './customer.dto';
@Injectable()
export class CustomerService {
  getAllUsers(): object {
    return { message: 'all users' };
  }

  searchCustomer(name: string): object {
    return { name: name, result: 'search active' };
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

  delete(id: string): object {
    return { id: id, message: 'customer deleted' };
  }

  getByEmail(email: string): object {
    return { email: email, message: 'customer found by email' };
  }
}
