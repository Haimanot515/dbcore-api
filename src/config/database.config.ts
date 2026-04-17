import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'),

    autoLoadEntities: true,
    synchronize: true, // ⚠️ dev only

    ssl: {
      rejectUnauthorized: false,
    },
  };
};