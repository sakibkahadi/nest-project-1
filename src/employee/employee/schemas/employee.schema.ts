import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'src/common/plugins/soft-delete.plugin';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true, unique: true, index: true })
  uuid!: string;
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop()
  phone!: string;

  @Prop({ required: true, unique: true, index: true })
  employeeId!: string;

  @Prop({ default: false })
  isDeleted!: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.plugin(softDeletePlugin);
