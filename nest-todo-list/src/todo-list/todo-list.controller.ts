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
  create(@Request() req, @Body() createPartialTodoListDto: any) {
    const authorId = req.user['userId'];
    const createTodoListDto: CreateTodoListDto = {
      authorId,
      ...createPartialTodoListDto,
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
    @Body() updatePartialTodoListDto: any,
  ) {
    const authorId = req.user['userId'];
    const updateTodoListDto: UpdateTodoListDto = {
      authorId,
      ...updatePartialTodoListDto,
    };

    return this.todoListService.update(+id, updateTodoListDto);
  }

  @UseGuards(JwtAuthGuardService)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
