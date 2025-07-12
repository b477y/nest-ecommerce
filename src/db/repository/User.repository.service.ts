import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/User.model';
import { Model } from 'mongoose';
import { DatabaseRepository } from './Database.repository';

@Injectable()
export class UserRepositoryService extends DatabaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {
    super(UserModel);
  }

  async checkDuplicateAccounts(email) {
    const user = await this.findOne({ filter: { email } });
    return user;
  }
}
