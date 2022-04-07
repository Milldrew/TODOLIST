import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Catch,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError } from 'typeorm';
import { GlobalExceptionFilter } from './exception.filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  create(@Body() createUserDto: CreateUserDto) {
    console.log('hello');
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
