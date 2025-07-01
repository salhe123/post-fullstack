import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { PostRepository } from 'src/domain/interfaces/post-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmPostRepository implements PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  async create(post: Partial<Post>): Promise<Post> {
    return this.repo.save(post);
  }

  async findOne(id: number): Promise<Post> {
    return this.repo.findOne({ where: { id }, relations: ['author'] });
  }

  async findOneWithComments(id: number): Promise<Post> {
    return this.repo.findOne({ where: { id }, relations: ['author', 'comments', 'comments.author'] });
  }

  async findAll(): Promise<Post[]> {
    return this.repo.find({ relations: ['author'] });
  }

  async update(id: number, post: Partial<Post>): Promise<Post> {
    await this.repo.update(id, post);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
