import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { GetCommentsQuery } from '../queries/get-comments.query';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a comment to a post' })
  @ApiResponse({ status: 201, type: Comment })
  async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Request() req,
  ): Promise<Comment> {
    return this.commentsService.createComment(
      new CreateCommentCommand(dto.content, postId, req.user.id),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get comments for a post' })
  @ApiResponse({ status: 200, type: [Comment] })
  async getAll(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentsService.getComments(new GetCommentsQuery(postId));
  }
}
