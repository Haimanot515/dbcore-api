import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  firstTask: string;
}