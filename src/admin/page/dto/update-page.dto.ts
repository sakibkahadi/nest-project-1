import { PartialType } from '@nestjs/mapped-types';
import { CreatePageNameDto } from './create-page.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
export class UpdatePageNameDto extends PartialType(CreatePageNameDto) {
  // make optional all create page dto just uuid is required so use here
  @IsUUID()
  @IsNotEmpty()
  uuid!: string;
}
