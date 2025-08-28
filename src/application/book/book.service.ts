import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'src/common/pagination';
import { BookEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  public async create(data: {
    name: string;
    isbn?: string;
    about?: string;
    quantity: number;
    authorIds: string[];
    categoryIds: string[];
  }): Promise<any> {}

  public async findById(data: { id: string }): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({
      where: { id: data.id },
      relations: ['authors', 'categories'],
    });

    if (!book) {
      throw new NotFoundException('Kitap Bulunamadı');
    }

    return book;
  }

  public async update(data: {
    id: string;
    name?: string;
    isbn?: string;
    about?: string;
    quantity?: number;
    authorIds?: string[];
    categoryIds?: string[];
  }): Promise<any> {}

  public async list(data: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<
    PageResult<{
      id: string;
      name: string;
      categories: string[];
      authors: string[];
    }>
  > {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('b')
      .select([
        `b.id AS id`,
        `b.name AS name`,
        `ARRAY_AGG(c.name) AS categories`,
        `ARRAY_AGG(a.name) AS authors`,
      ]);

    if (data.search) {
      queryBuilder.where(`b.name ILIKE :search`, {
        search: `%${data.search}%`,
      });
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items: items as any,
      limit: data.limit,
      page: data.page,
      total: total,
    };
  }

  public async deleteById(data: { id: string }): Promise<void> {
    const result = await this.bookRepository.delete({ id: data.id });

    if (!result.affected) {
      throw new NotFoundException('Kitap bulunamdı');
    }
  }
}
