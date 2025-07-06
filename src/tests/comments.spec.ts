import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../modules/comments/comments.service';
import { CommentRepository } from '../modules/comments/repositories/comment.repository';
import { CreateCommentCommand } from '../modules/comments/commands/create-comment.command';
import { GetCommentsQuery } from '../modules/comments/queries/get-comments.query';

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
    jest.spyOn(commentRepository, 'save').mockResolvedValue({
      id: '1',
      content: 'Great post!',
      post: {
        id: '1',
        title: 'Test Post',
        content: 'Content',
        author: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashed',
          role: 'USER',
          posts: [],
          comments: [],
        },
        comments: [],
      },
      author: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed',
        role: 'USER',
        posts: [],
        comments: [],
      },
    });
    const result = await service.createComment(command);
    expect(commentRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Great post!',
        post: expect.objectContaining({ id: '1' }),
        author: expect.objectContaining({ id: '1' }),
      }),
    );
    expect(result.content).toBe('Great post!');
    expect(result.id).toBe('1');
    expect(result.post.id).toBe('1');
    expect(result.author.id).toBe('1');
  });

  it('should get comments by post ID', async () => {
    const query = new GetCommentsQuery('1');
    jest.spyOn(commentRepository, 'findByPostId').mockResolvedValue([
      {
        id: '1',
        content: 'Great post!',
        post: {
          id: '1',
          title: 'Test Post',
          content: 'Content',
          author: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            password: 'hashed',
            role: 'USER',
            posts: [],
            comments: [],
          },
          comments: [],
        },
        author: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashed',
          role: 'USER',
          posts: [],
          comments: [],
        },
      },
    ]);

    const result = await service.getComments(query);

    expect(commentRepository.findByPostId).toHaveBeenCalledWith('1');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].content).toBe('Great post!');
    expect(result[0].post.id).toBe('1');
    expect(result[0].author.id).toBe('1');
  });
});
