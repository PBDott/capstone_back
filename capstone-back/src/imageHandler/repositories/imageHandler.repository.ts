import { PrismaService } from "src/prisma.service";
import { MetadataDto } from "../dto/metadata.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ImageHandlerRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async getFilePath(id: number) {
    const { path } = await this.prisma.image.findUnique({
      where: { id },
      select: { path: true }
    });
    return path;
  }

  async getMetadatas(id: number) {
    return this.prisma.image.findUnique({
      where: { id },
    });
  }

  async saveMetadata(metadata: MetadataDto) {
    const { height, name, path, size, userId, width } = metadata;
    const { id } = await this.prisma.image.create({
      data: {
        height,
        name,
        path,
        size,
        uploadedUserId: userId,
        width,
        // [TODO] use if needed
        additionalInfo: {},
      }
    });
    return id;
  }

  async attachImagesToTrade({ imageIds, tradeId }: { imageIds: number[], tradeId: number }) {
    return this.prisma.image.updateMany({
      where: {
        id: {
          in: imageIds,
        },
      },
      data: {
        tradeId,
      },
    });
  }

  async attachImagesToChat({ imageId, chatId }: { imageId: number, chatId: number }) {
    return this.prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        chatId,
      },
    });
  }


  async attachImageToClub({ imageId, clubId }: { imageId: number, clubId: number }) {
    return this.prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        clubId,
      },
    });
  }
}
