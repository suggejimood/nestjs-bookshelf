import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  public async create(): Promise<any> {}

  public async findById(): Promise<any> {}

  public async update(): Promise<any> {}

  public async list(): Promise<any> {}

  public async delete(): Promise<any> {}
}
