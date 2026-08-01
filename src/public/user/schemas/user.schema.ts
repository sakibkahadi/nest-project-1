import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, UserStatus } from '../user.type';
import { softDeletePlugin } from 'src/common/plugins/soft-delete.plugin';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, index: true })
  uuid!: string;

  @Prop({ required: true, trim: true, lowercase: true })
  email!: string;
  @Prop({ required: true, trim: true })
  name!: string;
  @Prop()
  phone!: string;
  @Prop({ required: true, select: false }) // select: false means that the password field will not be returned by default when querying the database. This is a security measure to prevent the password from being exposed in API responses. but for login we need to explicitly select the password field when querying the database. to do that we can use the select() method of the query builder. for example, to find a user by email and include the password field in the result, we can do something like this:
  // const user = await this.userModel.findOne({ email }).select('+password').exec();
  password!: string;

  @Prop({ type: String, enum: Role, default: Role.EMPLOYEE })
  role!: Role;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.NOT_VERIFIED })
  status!: UserStatus;

  @Prop({ default: false })
  isDeleted!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
// show only non-deleted users by default
UserSchema.plugin(softDeletePlugin);
// instead of creating a unique index on the email field, we can create a partial index that only applies to non-deleted users. This way, we can allow multiple users with the same email address as long as they are marked as deleted.

UserSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);
