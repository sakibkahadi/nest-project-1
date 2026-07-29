import { IsOptional } from 'class-validator';

export class ShowPageDto {
  // this ensure query parameters
  @IsOptional()
  uuid!: string;
}
