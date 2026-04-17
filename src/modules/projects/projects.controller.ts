import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // CREATE PROJECT + FIRST TASK (TRANSACTION)
  @Post('with-task')
  createProjectWithTask(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProjectWithTask(dto);
  }

  //  CREATE PROJECT ONLY
  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  //  GET ALL PROJECTS
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  //  GET ONE PROJECT
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  //  UPDATE PROJECT
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, dto);
  }

  //  DELETE PROJECT
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}