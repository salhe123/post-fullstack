import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/auth/entities/user.entity';
import { Post } from '../modules/posts/entities/post.entity';
import { Comment } from '../modules/comments/entities/comment.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgres://blog_user:123456@localhost:5432/blog',  // Hardcoded here
  entities: [User, Post, Comment],
  synchronize: true, // disable in production!
};
