import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CustomerDTO {
  @IsNotEmpty({ message: 'name is required' })
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Name should contain only alphabets',
  })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/^[^@]+@[^@]+\.xyz$/, {
    message: 'Email must be in .xyz domain and contain @',
  })
  email: string;

  @IsNotEmpty({ message: 'NID number is required' })
  @IsString()
  @Matches(/^\d{17}$/, {
    message: 'ID must contain exactly 17 digits',
  })
  id: string;
}
