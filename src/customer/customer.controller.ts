import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { CustomerEntity } from './customer.entity';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // create user (working)
  //   {
  //   "username": "Rafi",
  //   "fullname": "Rafi Ahmed",
  //   "email": "Rafi@ahmed.com",
  //   "password": "123456"
  // }
  @Post('create') @UsePipes(new ValidationPipe()) createUser(
    @Body() data: CustomerDTO,
  ): object {
    return this.customerService.createUser(data);
  }

  // get user customer by their full name "search?name="
  @Get('search')
  getUserByFullname(@Query('name') name: string) {
    return this.customerService.getUserByFullname(name);
  }

  // get user by their username(working)
  @Get('by-username/:username')
  getByUsername(@Param('username') username: string) {
    return this.customerService.getUserByUsername(username);
  }

  // delete user by username(working)
  @Delete('delete/:username')
  deleteUser(@Param('username') username: string) {
    return this.customerService.deleteUserByUsername(username);
  }

  //file upload
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', filename: file.filename };
  }

  //file upload ends here

  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }

  // working
  @Get('user/:id') getCustomerById(@Param('id') id: string): object {
    return this.customerService.getById(id);
  }

  // updates user- working
  @Put('update/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() data: CustomerDTO,
  ): Promise<object | null> {
    return this.customerService.update(id, data);
  }

  // get customer by their mail
  @UseGuards(AuthGuard)
  @Get('by-email')
  async getByEmail(@Query('email') email: string): Promise<CustomerEntity> {
    return this.customerService.getByEmail(email);
  }

  @Patch('partial-update/:id') async partialUpdate(
    @Param('id') id: string,
    @Body() data: Partial<CustomerDTO>,
  ): Promise<CustomerEntity | null> {
    return this.customerService.partialUpdate(id, data);
  }
}
