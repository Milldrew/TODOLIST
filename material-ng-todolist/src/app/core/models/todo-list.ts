import { Todo } from './todo';

export interface TodoList {
  id: number;
  name: string;
  todos: Todo[];
}
