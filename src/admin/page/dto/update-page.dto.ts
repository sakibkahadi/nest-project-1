import { PartialType } from '@nestjs/mapped-types';
import { CreatePageNameDto } from './create-page.dto';
export class UpdatePageNameDto extends PartialType(CreatePageNameDto) {}
