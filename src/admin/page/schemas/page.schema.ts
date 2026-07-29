import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'src/common/plugins/soft-delete.plugin';

export enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

@Schema({ timestamps: true })
export class PageName extends Document {
  @Prop({ required: true, unique: true, index: true })
  uuid!: string;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  slug!: string;

  @Prop({ type: String, enum: Status, default: Status.ACTIVE })
  status!: Status;

  @Prop({ default: 0 })
  position!: number;

  @Prop({ default: false })
  isDeleted!: boolean;
}

export const PageNameSchema = SchemaFactory.createForClass(PageName);
PageNameSchema.plugin(softDeletePlugin);
