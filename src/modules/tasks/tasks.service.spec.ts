import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  // ✅ CREATE TASK
  async create(data: Partial<Task>) {
    const task = this.taskRepo.create(data);
    return await this.taskRepo.save(task);
  }

  // 📖 GET ALL TASKS
  async findAll() {
    return await this.taskRepo.find({
      relations: ['project'], // join project
    });
  }

  // 🔍 GET ONE TASK
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
  async update(id: number, data: Partial<Task>) {
    const task = await this.findOne(id);

    Object.assign(task, data);

    return await this.taskRepo.save(task);
  }

  // ❌ DELETE TASK
  async remove(id: number) {
    const task = await this.findOne(id);

    await this.taskRepo.remove(task);

    return { message: `Task ${id} deleted successfully` };
  }

  // 🔍 QUERY BUILDER (ADVANCED)
  async findWithProjectQB(id: number) {
    return await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.id = :id', { id })
      .getOne();
  }
}