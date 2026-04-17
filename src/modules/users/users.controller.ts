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

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE USER
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  // GET ALL USERS
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // GET ONE USER
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // UPDATE USER
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  // DELETE USER
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // ADVANCED: QueryBuilder endpoint
  @Get(':id/projects-qb')
  findWithProjectsQB(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserWithProjectsQB(id);
  }
}