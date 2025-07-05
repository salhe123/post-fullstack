import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../modules/comments/comments.service';
import { CommentRepository } from '../modules/comments/repositories/comment.repository';
import { CreateCommentCommand } from '../modules/comments/commands/create-comment.command';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepository: CommentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: CommentRepository,
          useValue: { save: jest.fn(), findByPostId: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<CommentRepository>(CommentRepository);
  });

  it('should create a comment', async () => {
    const command = new CreateCommentCommand('Great post!', '1', '1');
    jest
      .spyOn(commentRepository, 'save')
      .mockResolvedValue({
        id: '1',
        content: 'Great post!',
        post: { id: '1' },
        author: { id: '1' },
      });
    const result = await service.createComment(command);
    expect(result.content).toBe('Great post!');
  });
});
