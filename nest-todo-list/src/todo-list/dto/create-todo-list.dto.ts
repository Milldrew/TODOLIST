import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export type Todo = {
  name: string;
  isFinished: boolean;
};
export class CreateTodoListDto {
  @IsNumber()
  authorId: number;
  @IsString()
  name: string;
  @IsArray()
  todos: Todo[];
}
