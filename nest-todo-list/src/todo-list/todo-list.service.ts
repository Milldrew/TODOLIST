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

  create(createTodoListDto: CreateTodoListDto, authorId: number) {
    const todoList = this.todoListRepo.create({
      authorId,
      ...createTodoListDto,
    });
    return this.todoListRepo.save(todoList);
  }

  findAll(user: any) {
    const id: any = user['userId'];
    console.table(user);
    console.table({ id });
    return this.todoListRepo.findBy({
      authorId: id,
    });
  }

  async findOne(id: number) {
    const todoList = await this.todoListRepo.findOneBy({ id });
    if (!todoList) {
      throw new NotFoundException(`Todo List #${id} not found`);
    }
    return todoList;
  }

  async update(
    id: number,
    updateTodoListDto: UpdateTodoListDto,
    authorId: number,
  ) {
    console.table({ id, ...updateTodoListDto });
    const todoList = await this.todoListRepo.preload({
      id: +id,
      authorId,
      ...updateTodoListDto,
    });
    if (!todoList) {
      throw new NotFoundException(`Todo List #${id} not found`);
    }

    return this.todoListRepo.save(todoList);
  }

  async remove(id: number) {
    const todoList = await this.todoListRepo.findOneBy({ id });
    if (!todoList) {
      throw new NotFoundException(`Todo List #${id} not found`);
    }

    return this.todoListRepo.remove(todoList);
  }
}
