import { Todo } from './todo';
export interface CreateUpdateTodoListDto {
  id: number;
  name: string;
  todos: Todo[];
}
