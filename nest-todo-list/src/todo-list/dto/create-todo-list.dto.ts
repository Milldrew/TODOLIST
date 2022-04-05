import { IsNumber, IsObject, IsString } from 'class-validator';

export type Todo = {
  name: string;
  isFinished: boolean;
};
export class CreateTodoListDto {
  @IsNumber()
  authorId: number;
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsObject({ each: true })
  todos: Todo[];
}
