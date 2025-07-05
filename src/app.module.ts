import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';

import { databaseConfig } from './config/database.config';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true } as ConfigModuleOptions),
    TypeOrmModule.forRoot(databaseConfig),
    JwtModule.register(jwtConfig),
    AuthModule,
    PostsModule,
    CommentsModule,
  ],
  providers: [],
})
export class AppModule {}
