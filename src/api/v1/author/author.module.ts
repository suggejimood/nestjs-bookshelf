import { Module } from '@nestjs/common';
import { AuthorService } from 'src/application/author/author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
