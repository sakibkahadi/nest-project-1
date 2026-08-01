import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'src/common/plugins/soft-delete.plugin';

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: true, unique: true, index: true })
  uuid!: string;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop()
  phone!: string;

  @Prop({ required: true, unique: true, index: true })
  adminId!: string;

  @Prop({ default: false })
  isDeleted!: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.plugin(softDeletePlugin);
