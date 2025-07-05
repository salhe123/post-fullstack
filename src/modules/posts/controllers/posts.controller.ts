import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreatePostCommand } from '../commands/create-post.command';
import { UpdatePostCommand } from '../commands/update-post.command';
import { DeletePostCommand } from '../commands/delete-post.command';
import { GetPostQuery } from '../queries/get-post.query';
import { GetPostsQuery } from '../queries/get-posts.query';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Post as PostEntity } from '../entities/post.entity';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

// Define interface for req.user
interface AuthRequest extends Request {
  user: { id: string };
}

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, type: PostEntity })
  async create(
    @Body() dto: CreatePostDto,
    @Request() req: AuthRequest,
  ): Promise<PostEntity> {
    return this.postsService.createPost(
      new CreatePostCommand(dto.title, dto.content, req.user.id),
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, type: PostEntity })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Request() req: AuthRequest,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(
      new UpdatePostCommand(id, dto.title, dto.content, req.user.id),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204 })
  async delete(
    @Param('id') id: string,
    @Request() req: AuthRequest,
  ): Promise<void> {
    return this.postsService.deletePost(new DeletePostCommand(id, req.user.id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post with comments' })
  @ApiResponse({ status: 200, type: PostEntity })
  async get(@Param('id') id: string): Promise<PostEntity | null> {
    return this.postsService.getPost(new GetPostQuery(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: [PostEntity] })
  async getAll(): Promise<PostEntity[]> {
    return this.postsService.getPosts(new GetPostsQuery());
  }
}
