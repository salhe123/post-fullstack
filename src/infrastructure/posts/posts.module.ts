import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities/post.entity';
import { TypeOrmPostRepository } from 'src/infrastructure/database/post.repository';
import { PostController } from 'src/infrastructure/controllers/post.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from 'src/application/commands/handlers/create-post.handler';
import { GetPostWithCommentsHandler } from 'src/application/queries/handlers/get-post-with-comments.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CqrsModule,
  ],
  controllers: [PostController],
  providers: [
    {
      provide: 'PostRepository',
      useClass: TypeOrmPostRepository,
    },
    CreatePostHandler,
    GetPostWithCommentsHandler,
  ],
})
export class PostsModule {}