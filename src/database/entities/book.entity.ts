import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DatabaseTables } from '../constants/tables';
import { AuthorEntity } from './author.entity';
import { CategoryEntity } from './category.entity';

@Entity(DatabaseTables.T_Book)
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  about?: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  isbn?: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  quantity!: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: Date;

  //Relations
  @ManyToMany(() => AuthorEntity, (a) => a.books, { cascade: ['insert'] })
  @JoinTable({
    name: DatabaseTables.T_BookAuthors,
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'author_id', referencedColumnName: 'id' },
  })
  authors!: AuthorEntity[];

  @ManyToMany(() => CategoryEntity, (c) => c.books, { cascade: ['insert'] })
  @JoinTable({
    name: DatabaseTables.T_BooksCategoryies,
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories!: CategoryEntity[];
}
