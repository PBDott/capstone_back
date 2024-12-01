export class MetadataDto {
  userId: number;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  additionalInfo?: Record<string, string>;
}