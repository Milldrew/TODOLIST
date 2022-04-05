import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepo: Repository<TodoList>,
  ) {}

  create(createTodoListDto: CreateTodoListDto) {
    const todoList = this.todoListRepo.create(createTodoListDto);
    return this.todoListRepo.save(todoList);
  }

  findAll() {
    return this.todoListRepo.find();
  }

  async findOne(id: number) {
    const todoList = await this.todoListRepo.findOneBy({ id });
    if (!todoList) {
      throw new NotFoundException(`Todo List #${id} not found`);
    }
    return todoList;
  }

  update(id: number, updateTodoListDto: UpdateTodoListDto) {
    return `This action updates a #${id} todoList`;
  }

  async remove(id: number) {
    const todoList = await this.todoListRepo.findOneBy({ id });
    if (!todoList) {
      throw new NotFoundException(`Todo List #${id} not found`);
    }

    return this.todoListRepo.remove(todoList);
  }
}
