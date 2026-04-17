import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { Task } from '../tasks/entities/task.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  // CREATE PROJECT + FIRST TASK (TRANSACTION)
  async createProjectWithTask(dto: CreateProjectDto) {
    return this.dataSource.transaction(async (manager) => {
      const project = manager.create(Project, {
        title: dto.title,
        user: { id: dto.userId }, // better than passing full user
      });

      await manager.save(project);

      const task = manager.create(Task, {
        description: dto.firstTask,
        project,
      });

      await manager.save(task);

      return { project, task };
    });
  }

  // CREATE PROJECT (NO TASK)
  async create(dto: CreateProjectDto) {
    const project = this.projectRepo.create({
      title: dto.title,
      user: { id: dto.userId },
    });

    return this.projectRepo.save(project);
  }

  // GET ALL PROJECTS
  async findAll() {
    return this.projectRepo.find({
      relations: ['tasks', 'user'],
    });
  }

  // GET ONE PROJECT
  async findOne(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['tasks', 'user'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // UPDATE PROJECT
  async update(id: number, dto: UpdateProjectDto) {
    await this.projectRepo.update(id, {
      ...dto,
      user: dto.userId ? { id: dto.userId } : undefined,
    });

    return this.findOne(id);
  }

  // DELETE PROJECT
  async remove(id: number) {
    return this.projectRepo.delete(id);
  }
}