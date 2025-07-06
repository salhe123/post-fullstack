import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/auth/entities/user.entity';
import { Post } from '../modules/posts/entities/post.entity';
import { Comment } from '../modules/comments/entities/comment.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://blog_user:123456@db:5432/blog', 
  entities: [User, Post, Comment],
  synchronize: true, // Disable in production
  retryAttempts: 10,
  retryDelay: 3000, // 3 seconds between retries
};
