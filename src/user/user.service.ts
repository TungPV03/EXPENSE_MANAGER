import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repository';
import { QueryUserDto, UpdateUserDto, UserDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}
  async createUser(user: UserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.userRepo.create({
      ...user,
      password: hashedPassword,
    });
  }

  async updateUserById(id: number, dto: UpdateUserDto) {
    return this.userRepo.updateById(id, dto);
  }

  async deleteUserById(id: number) {
    return this.userRepo.deleteById(id);
  }

  async findUserById(id: number) {
    return this.userRepo.getById(id);
  }

  async getListUsers(query: QueryUserDto) {
    const { offset, limit, order } = query;
    return this.userRepo.getListUser(offset, limit, order);
  }

  async updatePassword(id: number, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepo.updatePasseword(id, hashedPassword);
  }
}
