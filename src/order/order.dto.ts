import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDTO {
  @IsNotEmpty({ message: 'Product name is required' })
  @IsString()
  productName: string;

  @IsNotEmpty({ message: 'Total amount is required' })
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty({ message: 'Customer ID is required' })
  @IsString()
  customerId: string;

  @IsString()
  status?: string;
}
