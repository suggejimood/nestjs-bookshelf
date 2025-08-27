import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

/**
 * POST /author
 */
//Request
export class CreateAuthorBodyDto {
  @ApiProperty({
    example: 'İlber ORTAYLI',
    description: 'Author full name',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;
}

//Response
export class CreateAuthorResponseDto {
  @ApiProperty({
    example: '3f55df10-de5e-417f-b02c-7fd9540554ff',
    description: `Author's uuid`,
    type: 'string',
    format: 'uuid',
  })
  id: string;
}

/**
 * PATCH /author/:id
 */
//Request
export class UpdateAuthorParamDto {
  @ApiProperty({
    example: '3f55df10-de5e-417f-b02c-7fd9540554ff',
    description: `Author's uuid`,
    type: 'string',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class UpdateAuthorBodyDto {
  @ApiProperty({
    example: 'İlber ORTAYLI',
    description: 'Author full name',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;
}

//Response
export class UpdateAuthorResponseDto {
  @ApiProperty({
    example: '3f55df10-de5e-417f-b02c-7fd9540554ff',
    description: `Author's uuid`,
    type: 'string',
    format: 'uuid',
  })
  id: string;
}

/**
 * GET /author/:id
 */
//Request
export class DetailAuthorParamDto {
  @ApiProperty({
    example: '3f55df10-de5e-417f-b02c-7fd9540554ff',
    description: `Author's uuid`,
    type: 'string',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

//Response
class BookItemDto {
  @ApiProperty({
    example: '3f55df10-de5e-417f-b02c-7fd9540554ff',
    description: `Book uuid`,
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'Türklerin Tarihi',
    description: 'Book name',
    type: 'string',
  })
  name: string;
}

export class DetailAuthorResponseDto {
  @ApiProperty({
    example: '3f55df10-de5e-417f-b02c-7fd9540554ff',
    description: `Author's uuid`,
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'İlber ORTAYLI',
    description: 'Author full name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: `Author's books`,
    type: [BookItemDto],
    example: [
      {
        id: 'b2a0b6c2-9a3e-4d2c-8a7f-0b9c4f3a1e21',
        name: 'Türklerin Tarihi',
      },
      {
        id: 'b6b7e1b9-2a61-4a1e-9b21-7f6a0b6d1234',
        name: 'Bir Ömür Nasıl Yaşanır?',
      },
    ],
  })
  books: BookItemDto[];
}

/**
 * GET /author/list
 */
//Request
export class ListAuthorsQueryDto {
  @ApiProperty({
    example: '1',
    description: 'List page',
    type: 'string',
  })
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({
    example: '15',
    description: 'Number of item',
    type: 'string',
  })
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}

//Response
class AuthorsItemDto {
  @ApiProperty({
    example: '83dd49a7-a179-4cd6-8702-a909cd0f5174',
    description: 'Authors UUID',
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'İlber ORTAYLI',
    description: 'Author full name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: '2',
    description: 'Authors number of book',
    type: 'string',
  })
  numberOfBook: string;
}

export class ListAuthorResponseDto {
  @ApiProperty({
    example: '20',
    description: 'Total number of author',
    type: 'string',
  })
  totalItem: string;

  @ApiProperty({
    example: '20',
    description: 'Total number of page',
    type: 'string',
  })
  totalPage: string;

  @ApiProperty({
    description: `Author's books`,
    type: [AuthorsItemDto],
    example: [
      {
        id: 'b2a0b6c2-9a3e-4d2c-8a7f-0b9c4f3a1e21',
        name: 'İlber ORTAYLI',
      },
      {
        id: 'b6b7e1b9-2a61-4a1e-9b21-7f6a0b6d1234',
        name: 'Emrah SERBEST',
      },
    ],
  })
  items: AuthorsItemDto[];
}

/**
 * DELETE /author/:id
 */
//Request
export class DeleteAuthorParamDto {
  @ApiProperty({
    example: 'd60518e4-05e8-460a-af46-f23b17b346cd',
    description: 'Total number of page',
    type: 'string',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
