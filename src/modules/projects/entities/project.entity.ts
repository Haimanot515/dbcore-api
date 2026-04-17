import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('projects') // ✅ explicit table name (important in real apps)
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  // 🔥 FK column (VERY IMPORTANT for DTO-based APIs)
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'userId' }) // connects userId column to relation
  user: User;

  @OneToMany(() => Task, (task) => task.project, {
    cascade: true, // optional: auto-save tasks when saving project
  })
  tasks: Task[];
}