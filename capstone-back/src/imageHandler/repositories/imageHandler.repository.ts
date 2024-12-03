import { PrismaService } from "src/prisma.service";
import { MetadataDto } from "../dto/metadata.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ImageHandlerRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async getMetadatas(id: number) {
    await this.prisma.image.findUnique({
      where: { id },
    })
  }

  async saveMetadata(metadata: MetadataDto) {
    const { height, name, path, size, userId, width } = metadata;
    await this.prisma.image.create({
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
    })
  }
}
