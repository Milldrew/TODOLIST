import { Todo } from './todo';
export interface CreateUpdateTodoListDto {
  name: string;
  todos: Todo[];
}
