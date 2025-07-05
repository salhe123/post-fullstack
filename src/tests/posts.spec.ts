import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../modules/posts/posts.service';
import { PostRepository } from '../modules/posts/repositories/post.repository';
import { CreatePostCommand } from '../modules/posts/commands/create-post.command';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostRepository,
          useValue: {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('should create a post', async () => {
    const command = new CreatePostCommand('Test Post', 'Content', '1');
    jest
      .spyOn(postRepository, 'save')
      .mockResolvedValue({
        id: '1',
        title: 'Test Post',
        content: 'Content',
        author: { id: '1' },
      });
    const result = await service.createPost(command);
    expect(result.title).toBe('Test Post');
  });
});