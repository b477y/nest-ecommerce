import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryModel } from 'src/db/models/Category.model';
import { CategoryRepositoryService } from 'src/db/repository/Category.repository.service';
import { TokenService } from 'src/common/service/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from 'src/db/repository/User.repository.service';
import { UserModel } from 'src/db/models/User.model';

@Module({
  imports: [CategoryModel, UserModel],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepositoryService,
    TokenService,
    JwtService,
    UserRepositoryService,
  ],
})
export class CategoryModule {}
