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

  async findAll(user: any) {
    const id: any = user['userId'];
    console.log('FIND ALL LISTS SERVICE');
    const lists = await this.todoListRepo.findBy({
      authorId: id,
    });
    return lists.map((list) => {
      const { authorId, ...newList } = list;
      return newList;
    });
  }

  /**
   * Every lookup by id is scoped to its author. These used to load any list
   * by id, so any signed-in user could read, delete - or, through update's
   * preload with their own authorId, take over - anyone else's list. Someone
   * else's list is a 404, the same as one that does not exist.
   */
  async findOne(id: number, authorId: number) {
    const todoList = await this.todoListRepo.findOneBy({ id, authorId });
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
    await this.findOne(+id, authorId);
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

  async remove(id: number, authorId: number) {
    const todoList = await this.findOne(id, authorId);

    return this.todoListRepo.remove(todoList);
  }
}
