import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/'

export interface UserService {
  create(dto: CreateUserDto, salt: string):Promise<DocumentType<UserEntity>>
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  upDateById(dto: UpdateUserDto, userId: string): Promise<DocumentType<UserEntity> | null>;
}
