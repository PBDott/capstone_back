export class ImageHandlerEntity {
  id: number;
  userId: number;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  additionalInfo?: Record<string, string>;
}