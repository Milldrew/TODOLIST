import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GlobalExceptionFilter } from './exception.filter';

/**
 * Registration only. This controller used to expose GET /user (every user,
 * with their password), GET /user/:name, PATCH and DELETE - all without
 * authentication. The client only ever calls POST.
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
