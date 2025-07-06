import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../modules/posts/posts.service';
import { PostRepository } from '../modules/posts/repositories/post.repository';
import { CreatePostCommand } from '../modules/posts/commands/create-post.command';
import { UpdatePostCommand } from '../modules/posts/commands/update-post.command';
import { DeletePostCommand } from '../modules/posts/commands/delete-post.command';
import { GetPostQuery } from '../modules/posts/queries/get-post.query';
import { GetPostsQuery } from '../modules/posts/queries/get-posts.query';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

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
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('should create a post', async () => {
    const command = new CreatePostCommand('Test Post', 'Content', '1');
    jest.spyOn(postRepository, 'save').mockResolvedValue({
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
    });
    const result = await service.createPost(command);
    expect(postRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Post',
        content: 'Content',
        author: expect.objectContaining({ id: '1' }),
      }),
    );
    expect(result.title).toBe('Test Post');
    expect(result.id).toBe('1');
    expect(result.content).toBe('Content');
    expect(result.author.id).toBe('1');
    expect(result.comments).toEqual([]);
  });

  it('should update a post', async () => {
    const command = new UpdatePostCommand(
      '1',
      'Updated Post',
      'Updated Content',
      '1',
    );
    jest.spyOn(postRepository, 'findById').mockResolvedValue({
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
    });
    jest.spyOn(postRepository, 'save').mockResolvedValue({
      id: '1',
      title: 'Updated Post',
      content: 'Updated Content',
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
    });

    const result = await service.updatePost(command);

    expect(postRepository.findById).toHaveBeenCalledWith('1');
    expect(postRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        title: 'Updated Post',
        content: 'Updated Content',
        author: expect.objectContaining({ id: '1' }),
      }),
    );
    expect(result.title).toBe('Updated Post');
    expect(result.content).toBe('Updated Content');
  });

  it('should throw NotFoundException for update if post not found', async () => {
    const command = new UpdatePostCommand(
      '1',
      'Updated Post',
      'Updated Content',
      '1',
    );
    jest.spyOn(postRepository, 'findById').mockResolvedValue(null);

    await expect(service.updatePost(command)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw UnauthorizedException for update if not author', async () => {
    const command = new UpdatePostCommand(
      '1',
      'Updated Post',
      'Updated Content',
      '2',
    );
    jest.spyOn(postRepository, 'findById').mockResolvedValue({
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
    });

    await expect(service.updatePost(command)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should delete a post', async () => {
    const command = new DeletePostCommand('1', '1');
    jest.spyOn(postRepository, 'findById').mockResolvedValue({
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
    });
    jest.spyOn(postRepository, 'delete').mockResolvedValue(undefined);

    await service.deletePost(command);

    expect(postRepository.findById).toHaveBeenCalledWith('1');
    expect(postRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException for delete if post not found', async () => {
    const command = new DeletePostCommand('1', '1');
    jest.spyOn(postRepository, 'findById').mockResolvedValue(null);

    await expect(service.deletePost(command)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw UnauthorizedException for delete if not author', async () => {
    const command = new DeletePostCommand('1', '2');
    jest.spyOn(postRepository, 'findById').mockResolvedValue({
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
    });

    await expect(service.deletePost(command)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should get a post by ID', async () => {
    const query = new GetPostQuery('1');
    jest.spyOn(postRepository, 'findById').mockResolvedValue({
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
    });

    const result = await service.getPost(query);

    expect(postRepository.findById).toHaveBeenCalledWith('1');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.id).toBe('1');
      expect(result.title).toBe('Test Post');
      expect(result.content).toBe('Content');
      expect(result.author.id).toBe('1');
    }
  });

  it('should return null if post not found', async () => {
    const query = new GetPostQuery('1');
    jest.spyOn(postRepository, 'findById').mockResolvedValue(null);

    const result = await service.getPost(query);

    expect(postRepository.findById).toHaveBeenCalledWith('1');
    expect(result).toBeNull();
  });

  it('should get all posts', async () => {
    const query = new GetPostsQuery();
    jest.spyOn(postRepository, 'findAll').mockResolvedValue([
      {
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
    ]);

    const result = await service.getPosts(query);

    expect(postRepository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].title).toBe('Test Post');
    expect(result[0].content).toBe('Content');
    expect(result[0].author.id).toBe('1');
  });
});
