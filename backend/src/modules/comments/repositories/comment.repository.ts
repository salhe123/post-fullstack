import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment) private readonly repo: Repository<Comment>,
  ) {}

  async findByPostId(postId: string): Promise<Comment[]> {
    return this.repo.find({
      where: { post: { id: postId } },
      relations: ['author'],
    });
  }

  async save(comment: Comment): Promise<Comment> {
    return this.repo.save(comment);
  }
}
