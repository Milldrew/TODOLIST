import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  private readonly users = [
    { userId: 1, username: 'john', password: 'changeme' },
    { userId: 2, username: 'maria', password: 'guess' },
  ];
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOneByName(name: string) {
    const user = this.users.find((user) => user.username === name);
    if (!user) {
      throw new NotFoundException(`User #${name} not found`);
    }
    console.log({ user });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.userId === id);
    if (userIndex < 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.users.splice(userIndex, 1);
  }
}
