import { Injectable } from '@nestjs/common';
import { CommentRepository } from './repositories/comment.repository';
import { CreateCommentCommand } from './commands/create-comment.command';
import { GetCommentsQuery } from './queries/get-comments.query';
import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(command: CreateCommentCommand): Promise<Comment> {
    const comment = new Comment();
    comment.content = command.content;
    comment.post = { id: command.postId } as Post;
    comment.author = { id: command.authorId } as User;
    return this.commentRepository.save(comment);
  }

  async getComments(query: GetCommentsQuery): Promise<Comment[]> {
    return this.commentRepository.findByPostId(query.postId);
  }
}
