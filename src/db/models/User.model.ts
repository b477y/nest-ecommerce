import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { generateHash } from 'src/common/security/hash.security';

export enum GenderTypes {
  male = 'male',
  female = 'female',
}

export enum RoleTypes {
  user = 'user',
  admin = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: GenderTypes })
  gender: GenderTypes;

  @Prop({ type: String, enum: RoleTypes, default: RoleTypes.user })
  role: RoleTypes;

  @Prop({ type: String, required: false })
  address: string;

  @Prop({ type: String, required: false })
  phoneNumber: string;

  @Prop({ type: Date })
  confirmedAt: Date;
}

export type UserDocument = HydratedDocument<User>; // return document type => contain => Document & User
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = generateHash(this.password);
  }
  return next();
});

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
