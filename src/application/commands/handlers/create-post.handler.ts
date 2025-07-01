import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { PostRepository } from 'src/domain/interfaces/post-repository.interface';
import { CreatePostCommand } from '../create-post.command';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject('PostRepository')
    private readonly postRepository: PostRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: CreatePostCommand) {
    const { title, content, authorId } = command;

    // Verify user exists
    const user = await this.userRepository.findOne({ where: { id: authorId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }

    // Create post with author reference
    const post = { title, content, author: { id: authorId } as User };
    return this.postRepository.create(post);
  }
}
