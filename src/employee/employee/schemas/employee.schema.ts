import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { softDeletePlugin } from 'src/common/plugins/soft-delete.plugin';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true, unique: true, index: true })
  uuid!: string;
  @Prop({ required: true, trim: true, lowercase: true })
  email!: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

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
// instead of creating a unique index on the email field, we can create a partial index that only applies to non-deleted users. This way, we can allow multiple users with the same email address as long as they are marked as deleted.

EmployeeSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);
