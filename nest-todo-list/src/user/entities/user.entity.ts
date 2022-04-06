import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique('unique name', ['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  username: string;
  @Column()
  password: string;
}
