import { Catch, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Catch(QueryFailedError)
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  /** Stores a bcrypt hash - never the password - and never returns either. */
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    const { userId, username } = await this.userRepo.save(newUser);
    return { userId, username };
  }

  async findOneByName(name: string) {
    const user = await this.userRepo.findOneBy({ username: name });
    if (!user) {
      throw new NotFoundException(`User #${name} not found`);
    }
    return user;
  }
}
