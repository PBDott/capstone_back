import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageHandlerService } from './imageHandler.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { Response } from 'express';
import { Request } from 'src/common/user.interface';

@Controller('images')
export class ImageHandlerController {
  constructor(private readonly imageHandlerService: ImageHandlerService) { }

  @Get()
  async getImage(
    @Query('id', new ParseIntPipe({ optional: true })) id: number,
    @Query('filename') filename: string,
    @Res() res: Response
  ) {
    try {
      const { path, contentType } = await this.imageHandlerService.getImageInfo({ id, filename });
      res.setHeader('Content-Type', contentType);
      res.sendFile(path);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Image not found or inaccessible');
    }
  }

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const filename = basename(file.originalname, ext);
          const uniqueSuffix = Date.now();
          const sanitized = Buffer.from(filename, 'latin1')
            .toString('utf8')
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-z0-9가-힣-]/g, '');
          callback(null, `${uniqueSuffix}-${sanitized}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|tiff)/)) {
          return callback(new Error('not an image'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5242880,
      },
    }),
  )
  async uploadImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Query(
      'width',
      new DefaultValuePipe(null),
      new ParseIntPipe({ optional: true }),
    )
    width?: number,
    @Query(
      'height',
      new DefaultValuePipe(null),
      new ParseIntPipe({ optional: true }),
    )
    height?: number,
    @Query(
      'quality',
      new DefaultValuePipe(null),
      new ParseIntPipe({ optional: true }),
    )
    quality?: number,
  ) {
    return this.imageHandlerService.processImage({
      file,
      userId: req.payload.userId,
      options: {
        width,
        height,
        quality,
      }
    });
  }
}
