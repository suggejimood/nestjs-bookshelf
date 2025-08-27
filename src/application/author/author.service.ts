import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'src/common/pagination';
import { AuthorEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async create(data: { name: string }): Promise<AuthorEntity> {
    const author = new AuthorEntity();

    author.name = data.name;

    await this.authorRepository.save(author);

    return author;
  }

  public async findById(data: { id: string }): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne({
      where: { id: data.id },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException('Author can not found');
    }

    return author;
  }

  public async update(data: {
    id: string;
    name: string;
  }): Promise<AuthorEntity> {
    const author = await this.findById({ id: data.id });

    author.name = data.name;

    await this.authorRepository.save(author);

    return author;
  }

  public async list(data: {
    limit: number;
    page: number;
    search?: string;
  }): Promise<PageResult<{ id: string; name: string; numberOfBook: number }>> {
    const queryBuilder = this.authorRepository
      .createQueryBuilder('a')
      .select([`a.id AS id`, `a.name AS name`, `COUNT(b.id) AS "numberOfBook"`])
      .leftJoin('a.books', 'b');

    if (data.search) {
      queryBuilder.where(`a.name ILIKE :search`, {
        search: `%${data.search}%`,
      });
    }

    queryBuilder
      .orderBy('a.createdAt', 'DESC')
      .skip((data.page - 1) * data.limit)
      .take(data.limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items: items as any,
      limit: data.limit,
      page: data.limit,
      total: total,
    };
  }

  public async deleteById(data: { id: string }): Promise<void> {
    const response = await this.authorRepository.delete({ id: data.id });

    if (!response.affected) {
      throw new NotFoundException('Yazar bulunamadı');
    }
  }
}
