import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty({ message: 'Street is required' })
  @IsString()
  street: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString()
  state: string;

  @IsNotEmpty({ message: 'Zip code is required' })
  @IsString()
  zipCode: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString()
  country: string;

  @IsNotEmpty({ message: 'Customer ID is required' })
  @IsString()
  customerId: string;
}
