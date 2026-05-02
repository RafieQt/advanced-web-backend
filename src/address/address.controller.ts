import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDTO } from './address.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('address')
@UseGuards(AuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // Create address
  //   {
  //   "street": "123 Kuril",
  //   "city": "Dhaka",
  //   "state": "Dhaka Division",
  //   "zipCode": "1000",
  //   "country": "Bangladesh",
  //   "customerId": "cust_abc123"
  // }
  @Post('create')
  @UsePipes(new ValidationPipe())
  createAddress(@Body() addressData: AddressDTO) {
    return this.addressService.createAddress(addressData);
  }

  // Get address by ID
  @Get(':id')
  getAddressById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.getAddressById(id);
  }

  // Get address by customer ID
  @Get('customer/:customerId')
  getAddressByCustomer(@Param('customerId') customerId: string) {
    return this.addressService.getAddressByCustomer(customerId);
  }

  // Delete address
  @Delete('delete/:id')
  deleteAddress(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.deleteAddress(id);
  }
}
