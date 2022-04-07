import { Todo } from './todo';

export interface Todolist {
  id: number;
  name: string;
  todos: Todo[];
}
