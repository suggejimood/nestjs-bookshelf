import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('POSTGRESQL_HOST'),
  port: config.get<number>('POSTGRESQL_PORT'),
  username: config.get<string>('POSTGRESQL_USER'),
  password: config.get<string>('POSTGRESQL_PASSWORD'),
  database: config.get<string>('POSTGRESQL_DATABASE'),
  synchronize: true,
  entities: [
    path.join(__dirname, '../../database/entities/**/*.entity.{ts,js}'),
  ],
  logging: false,
});
