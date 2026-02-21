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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('allusers') getAll(): object {
    return this.customerService.getAllUsers();
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
      limits: { fileSize: 30000 },
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

  @Get('user/:id') getCustomerById(@Param('id') id: string): object {
    return this.customerService.getById(id);
  }

  @Get('search') searchCustomer(@Query('name') name: string): object {
    return this.customerService.searchCustomer(name);
  }

  @Post('create') @UsePipes(new ValidationPipe()) createCustomer(
    @Body() data: CustomerDTO,
  ): object {
    return this.customerService.createCustomer(data);
  }

  @Put(':id') updateCustomer(
    @Param('id') id: string,
    @Body() data: CustomerDTO,
  ): object {
    return this.customerService.update(id, data);
  }

  @Patch(':id') partialUpdate(
    @Param('id') id: string,
    @Body() data: CustomerDTO,
  ): object {
    return this.customerService.partialUpdate(id, data);
  }

  @Delete(':id') deleteCustomer(@Param('id') id: string): object {
    return this.customerService.delete(id);
  }

  @Get('by-email') getByEmail(@Query('email') email: string): object {
    return this.customerService.getByEmail(email);
  }
}
