import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  //  CREATE USER
  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  //  GET ALL USERS
  async findAll(): Promise<User[]> {
    return await this.userRepo.find({
      relations: ['projects'],
    });
  }

  // GET ONE USER
  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['projects'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // UPDATE USER (FIXED + CLEAN)
  async update(id: number, data: Partial<User>): Promise<User> {
    const result = await this.userRepo.update(id, data);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepo.findOne({
      where: { id },
      relations: ['projects'],
    }) as User;
  }

  // DELETE USER (FIXED + SAFE)
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.userRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      message: `User ${id} deleted successfully`,
    };
  }

  // QUERY BUILDER (ADVANCED)
  async findUserWithProjectsQB(id: number): Promise<User | null> {
    return await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.projects', 'project')
      .where('user.id = :id', { id })
      .getOne();
  }
}