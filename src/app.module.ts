import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';

import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    //  Global config system
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //  Inject ConfigService into TypeORM
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),

    UsersModule,
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {}