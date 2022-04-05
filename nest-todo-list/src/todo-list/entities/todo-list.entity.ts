import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '../dto/create-todo-list.dto';

@Entity()
export class TodoList {
  @Column()
  authorId: number;
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('json', { nullable: true })
  todos: Todo[];
}
