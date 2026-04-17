import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  projectId: number;
}