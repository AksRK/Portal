import {
    BadRequestException,
    Controller, Delete, Get,
    Post, Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FilesService } from './files.service';
import {FileInterceptor} from "@nestjs/platform-express";
import { Multer } from 'multer';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/image/')
  @UseInterceptors(
      FileInterceptor('image', {

        limits: {
          fileSize: 1024 * 1024 * 5, // 5MB
          files: 1, // Ограничение количества файлов
        },

        fileFilter: (req, file, cb) => {
          if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.mimetype)) {
            cb(new BadRequestException('Invalid picture type'), false);
          }else {
            cb(null, true);
          }
        }

      })
  )
  async uploadImage(@UploadedFile() imageFile: Multer.File) {
    return this.filesService.uploadImage(imageFile)
  }

  @Get('/image/')
  async getAllImages() {
      return this.filesService.getAllImages()
  }

  @Delete('/image/')
  async removeImage(
      @Query('id') id: string,
      @Query('folderPath') folderPath: string,
  ) {
      return this.filesService.removeImage({id, folderPath})
  }

  @Delete('/image/all')
  async removeAllImage() {
      return this.filesService.removeAllImage()
  }
}
