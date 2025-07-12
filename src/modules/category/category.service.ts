import { Injectable } from '@nestjs/common';
import { CategoryDocument } from 'src/db/models/Category.model';
import { CategoryRepositoryService } from 'src/db/repository/Category.repository.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepositoryService: CategoryRepositoryService,
  ) {}

  create(body: any) {
    const category = this.categoryRepositoryService.create({
      name: body.name,
    });
    return { message: 'Category added successfully', data: category };
  }
}
