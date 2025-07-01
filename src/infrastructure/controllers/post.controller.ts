import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from 'src/application/commands/create-post.command';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  async createPost(@Body() body: { title: string; content: string }, @Request() req) {
    const command = new CreatePostCommand(body.title, body.content, req.user.sub);
    return this.commandBus.execute(command);
  }
}