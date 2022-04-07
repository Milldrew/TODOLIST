import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export interface AuthorId {
  authorId: number;
}
export type Todo = {
  name: string;
  isFinished: boolean;
};
export class CreateTodoListDto {
  @IsString()
  name: string;
  @IsArray()
  todos: Todo[];
}
