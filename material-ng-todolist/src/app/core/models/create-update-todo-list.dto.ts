import { Todo } from './todo';
export interface CreateUpdateTodoListDto {
  authorId?: number;
  name?: string;
  todos?: Todo[];
}
