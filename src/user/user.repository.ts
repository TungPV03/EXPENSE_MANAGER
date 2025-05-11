import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updateById(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...data });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async updatePasseword(id: number, password: string) {
    const user = await this.userRepository.preload({ id, password });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async deleteById(id: number) {
    const result = await this.userRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} has been deleted successfully` };
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getListUser(
    offset: number,
    limit: number,
    order: 'ASC' | 'DESC' = 'ASC',
  ) {
    const users = await this.userRepository.find({
      skip: offset,
      take: limit,
      order: {
        fullName: order,
      },
    });

    return users;
  }
  async getUserByConditions(conditions: any) {
    const user = await this.userRepository.findOne({ where: conditions });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async verifyEmailAndUsername(condition: any){
    const user = await this.userRepository.findOne({ where: condition });
    if (user) {
      throw new ConflictException(`Email or username already exists`);
    }
    return user;
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
