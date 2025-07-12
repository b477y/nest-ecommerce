import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/common/decorators/auth.composed.decorator';
import { RoleTypes } from 'src/db/models/User.model';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth([RoleTypes.admin])
  @Post()
  create(@Body() body: any) {
    return this.categoryService.create(body);
  }
}
