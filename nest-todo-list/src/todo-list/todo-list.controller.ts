import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { AuthorId, CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { JwtAuthGuardService } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @UseGuards(JwtAuthGuardService)
  @Post()
  create(@Request() req, @Body() createTodoListDto: CreateTodoListDto) {
    const authorId = req.user['userId'];
    return this.todoListService.create(createTodoListDto, authorId);
  }

  @UseGuards(JwtAuthGuardService)
  @Get()
  findAll(@Request() req) {
    return this.todoListService.findAll(req.user);
    console.log(req.user);
  }

  @UseGuards(JwtAuthGuardService)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListService.findOne(+id);
  }

  @UseGuards(JwtAuthGuardService)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    const authorId = req.user['userId'];

    return this.todoListService.update(+id, updateTodoListDto, authorId);
  }

  @UseGuards(JwtAuthGuardService)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
