import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthorService } from 'src/application/author/author.service';
import {
  CreateAuthorBodyDto,
  CreateAuthorResponseDto,
  DeleteAuthorParamDto,
  DetailAuthorParamDto,
  DetailAuthorResponseDto,
  ListAuthorResponseDto,
  ListAuthorsQueryDto,
  UpdateAuthorBodyDto,
  UpdateAuthorParamDto,
  UpdateAuthorResponseDto,
} from './dto/author.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authors')
@Controller({ path: '/author', version: '1' })
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CreateAuthorResponseDto })
  public async createAuthorHandler(
    @Body() body: CreateAuthorBodyDto,
  ): Promise<CreateAuthorResponseDto> {
    const result = await this.authorService.create({ name: body.name });

    return { id: result.id };
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateAuthorResponseDto })
  async updateAuthorHandler(
    @Param() param: UpdateAuthorParamDto,
    @Body() body: UpdateAuthorBodyDto,
  ): Promise<UpdateAuthorResponseDto> {
    const result = await this.authorService.update({
      id: param.id,
      name: body.name,
    });

    return { id: result.id };
  }

  @Get('/list')
  public async listAuthorHandler(
    @Query() query: ListAuthorsQueryDto,
  ): Promise<ListAuthorResponseDto> {
    const result = await this.authorService.list({
      limit: query.limit,
      page: query.limit,
    });

    return {
      totalItem: result.total,
      totalPage: result.page,
      items: result.items,
    };
  }

  @Get('/:id')
  @ApiOkResponse({ type: DetailAuthorResponseDto })
  public async detailAuthorHandler(
    @Param() param: DetailAuthorParamDto,
  ): Promise<DetailAuthorResponseDto> {
    const result = await this.authorService.findById({ id: param.id });

    return {
      id: result.id,
      name: result.name,
      books: result.books.map((b) => {
        return { id: b.id, name: b.name };
      }),
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Author deleted' })
  public async deleteAuthorHandler(
    @Param() param: DeleteAuthorParamDto,
  ): Promise<void> {
    await this.authorService.deleteById({ id: param.id });
  }
}
