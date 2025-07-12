import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../models/Category.model';
import { Model } from 'mongoose';
import { DatabaseRepository } from './Database.repository';

@Injectable()
export class CategoryRepositoryService extends DatabaseRepository<CategoryDocument> {
  constructor(
    @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
  ) {
    super(CategoryModel);
  }
}
