import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepo } from './user.repository';
import { User } from 'src/entities/user.entity';
import { UploadService } from 'src/common-services/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepo, UploadService],
  exports: [UserService, UserRepo],
})
export class UserModule {}
