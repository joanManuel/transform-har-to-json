import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('har')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage()
  }))
  readHar(
    @UploadedFile() file: Express.Multer.File,
  ) {

    if(!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    return this.appService.readHar(file);
  }
}
