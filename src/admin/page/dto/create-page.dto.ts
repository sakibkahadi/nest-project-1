import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../schemas/page.schema';
import { Type } from 'class-transformer';

export class CreatePageNameDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  // here type is use becasue in formdata everthing convert as string this ensure it convert to "1" to 1.
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  position?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
