import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.repo.find({ relations: ['author'] });
  }

  async findById(id: string): Promise<Post | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
  }

  async save(post: Post): Promise<Post> {
    return this.repo.save(post);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
