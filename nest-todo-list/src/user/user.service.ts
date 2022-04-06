import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users = [
    { userId: 1, username: 'john', password: 'changeme' },
    { userId: 2, username: 'maria', password: 'guess' },
  ];
  create(createUserDto: CreateUserDto) {
    const id = Math.floor(Math.random() * 1000);
    const newUser = { userId: id, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  async findOneByName(name: string) {
    const user = this.users.find((user) => user.username === name);
    if (!user) {
      throw new NotFoundException(`User #${name} not found`);
    }
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
