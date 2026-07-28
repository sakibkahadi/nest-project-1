import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ShowPageDto {
  // this ensure query parameters
  @IsOptional()
  uuid!: string;
}
