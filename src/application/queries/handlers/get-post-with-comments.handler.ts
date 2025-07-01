import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostRepository } from 'src/domain/interfaces/post-repository.interface';
import { GetPostWithCommentsQuery } from '../get-post-with-comments.query';
import { Inject } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@QueryHandler(GetPostWithCommentsQuery)
export class GetPostWithCommentsHandler
  implements IQueryHandler<GetPostWithCommentsQuery>
{
  constructor(
    @Inject('PostRepository')
    private readonly postRepository: PostRepository,
  ) {}

  async execute(query: GetPostWithCommentsQuery) {
    return this.postRepository.findOneWithComments(query.postId);
  }
}
