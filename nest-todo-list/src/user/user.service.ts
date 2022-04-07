import { Catch, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Catch(QueryFailedError)
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOneByName(name: string) {
    const user = await this.userRepo.findOneBy({ username: name });
    if (!user) {
      throw new NotFoundException(`User #${name} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepo.preload({ userId: id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }
    return user;
  }

  async remove(id: number) {
    const userId = id;
    const user = await this.userRepo.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }
    return this.userRepo.remove(user);
  }
}
