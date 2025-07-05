import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { CreatePostCommand } from './commands/create-post.command';
import { UpdatePostCommand } from './commands/update-post.command';
import { DeletePostCommand } from './commands/delete-post.command';
import { GetPostQuery } from './queries/get-post.query';
import { GetPostsQuery } from './queries/get-posts.query';
import { Post } from './entities/post.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(command: CreatePostCommand): Promise<Post> {
    const post = new Post();
    post.title = command.title;
    post.content = command.content;
    post.author = { id: command.authorId } as User;
    return this.postRepository.save(post);
  }

  async updatePost(command: UpdatePostCommand): Promise<Post> {
    const post = await this.postRepository.findById(command.id);
    if (!post) throw new NotFoundException('Post not found');
    if (post.author.id !== command.authorId)
      throw new UnauthorizedException('Not authorized');
    post.title = command.title || post.title;
    post.content = command.content || post.content;
    return this.postRepository.save(post);
  }

  async deletePost(command: DeletePostCommand): Promise<void> {
    const post = await this.postRepository.findById(command.id);
    if (!post) throw new NotFoundException('Post not found');
    if (post.author.id !== command.authorId)
      throw new UnauthorizedException('Not authorized');
    await this.postRepository.delete(command.id);
  }

  async getPost(query: GetPostQuery): Promise<Post | null> {
    return this.postRepository.findById(query.id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPosts(_query: GetPostsQuery): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}
