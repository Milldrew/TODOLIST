import { Todo } from './todo';

export interface Todolist {
  authorId: number;
  id: number;
  name: string;
  todos: Todo[];
}
