import { IsUUID } from 'class-validator';

export class DeletePageNameDto {
  @IsUUID()
  uuid!: string;
}
