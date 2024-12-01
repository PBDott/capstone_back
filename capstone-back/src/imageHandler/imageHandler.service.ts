import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ImageHandlerRepository } from './repositories/imageHandler.repository';
import { extname, join, resolve } from 'path';
import { promises as fs } from 'fs';
import { lookup } from 'mime-types';
import sharp from 'sharp';

@Injectable()
export class ImageHandlerService {
  private readonly path = './uploads';

  constructor(
    // [CHECK] gonna use CDN? then use repository for mapping image id and CDN's url
    private readonly imageHandlerRepository: ImageHandlerRepository,
  ) { }

  async getImageInfo(filename: string) {
    const filePath = join(this.path, filename);

    try {
      await fs.access(filePath);

      const contentType = lookup(filePath) || 'application/octet-stream';
      if (!contentType.startsWith('image/')) {
        throw new NotFoundException('Not an image file');
      }

      return {
        path: resolve(filePath),
        contentType,
      };
    } catch (e) {
      console.error(e);
      throw new NotFoundException('inaccessible');
    }
  }

  async processImage({ file, userId, options }: {
    file: Express.Multer.File,
    userId: number,
    options: {
      width?: number;
      height?: number;
      quality?: number;
    }
  }) {
    try {
      const metadata = await sharp(file.path).metadata();
      const ext = extname(file.filename);
      const resized = sharp(file.path).resize(options.width ?? null, options.height ?? null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
      const path = join(this.path, `_${file.filename}`);
      switch (ext) {
        case '.jpeg':
          await resized
            .jpeg({ quality: options.quality ?? 80 })
            .toFile(join(this.path, `_${file.filename}`));
          break;
        case '.png':
          await resized
            .png({ quality: options.quality ?? 80 })
            .toFile(join(this.path, `_${file.filename}`));
          break;
        case '.gif':
          // [CHECK] use gifsicle if needed: processed gif don't move
          await resized.gif().toFile(join(this.path, `_${file.filename}`));
          break;
        case '.tiff':
          await resized
            .tiff({ quality: options.quality ?? 80 })
            .toFile(join(this.path, `_${file.filename}`));
          break;
        default:
          throw new BadRequestException('not filtered');
      }

      await this.imageHandlerRepository.saveMetadata({
        width: metadata.width,
        height: metadata.height,
        name: file.originalname,
        path,
        size: file.size,
        userId,
      });
      // [CHECK] gonna use AWS S3? then add saving metadata of files to db here
      /* example
        const res = await this.uploadToS3(file);
        await this.saveMetadatas(...);
        return imageUrl;
      */
      return file.filename;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        `image processing failed: ${e.message}`,
      );
    }
  }
}
