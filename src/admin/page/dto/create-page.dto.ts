import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../schemas/page.schema';

export class CreatePageNameDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsNumber()
  @IsOptional()
  position?: number;
}
