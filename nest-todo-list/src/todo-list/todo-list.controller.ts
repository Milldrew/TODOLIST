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
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { JwtAuthGuardService } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @UseGuards(JwtAuthGuardService)
  @Post()
  create(@Request() req, @Body() createParticalTodoListDto: any) {
    const authorId = req.user['userId'];
    const createTodoListDto: CreateTodoListDto = {
      authorId,
      ...createParticalTodoListDto,
    };
    console.table(req.user);
    return this.todoListService.create(createTodoListDto);
  }

  @UseGuards(JwtAuthGuardService)
  @Get()
  findAll(@Request() req) {
    return this.todoListService.findAll(req.user);
    console.log(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.update(+id, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
