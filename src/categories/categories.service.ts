import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto, user: User) {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      user,
    });
    return this.categoryRepository.save(category);
  }

  findAll(user: User) {
    return this.categoryRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: User) {
    const category = await this.categoryRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user: User) {
    const category = await this.findOne(id, user);
    const updated = this.categoryRepository.merge(category, updateCategoryDto);
    return this.categoryRepository.save(updated);
  }

  async remove(id: number, user: User) {
    const category = await this.findOne(id, user);
    await this.categoryRepository.remove(category);
    return { deleted: true };
  }
}
