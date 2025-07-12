import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ICategory } from 'src/modules/category/category.interface';

@Schema({ timestamps: true })
export class Category implements ICategory {
  @Prop({ type: Types.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ type: String, minlength: 2, maxlength: 50 })
  name: string;

  @Prop({ type: String, minlength: 2, maxlength: 75 })
  slug: string;

  @Prop({ type: String })
  logo: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
export const CategoryModel = MongooseModule.forFeature([
  { name: Category.name, schema: CategorySchema },
]);
