import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  // CREATE TASK
  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepo.create({
      description: createTaskDto.description,
      project: { id: createTaskDto.projectId }, // relation link
    });

    return await this.taskRepo.save(task);
  }

  //  GET ALL TASKS
  async findAll() {
    return await this.taskRepo.find({
      relations: ['project'], // include project info
    });
  }

  //  GET ONE TASK
  async findOne(id: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return task;
  }

  // ✏️ UPDATE TASK
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    Object.assign(task, {
      description: updateTaskDto.description,
      project: updateTaskDto.projectId
        ? { id: updateTaskDto.projectId }
        : task.project,
    });

    return await this.taskRepo.save(task);
  }

  // ❌ DELETE TASK
  async remove(id: number) {
    const task = await this.findOne(id);

    await this.taskRepo.remove(task);

    return { message: `Task ${id} deleted successfully` };
  }

  // 🔍 QUERY BUILDER (JOIN PROJECT)
  async findWithProjectQB(id: number) {
    return await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.id = :id', { id })
      .getOne();
  }
}