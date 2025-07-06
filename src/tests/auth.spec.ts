import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../modules/auth/auth.service';
import { UserRepository } from '../modules/auth/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterCommand } from '../modules/auth/commands/register.command';
import { LoginCommand } from '../modules/auth/commands/login.command';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a user', async () => {
    const command = new RegisterCommand(
      'test@example.com',
      'Test User',
      'pass123',
    );

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashed',
      role: 'USER',
      posts: [],
      comments: [],
    });

    const result = await service.register(command);

    expect(userRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      }),
    );
    expect(result.email).toBe('test@example.com');
    expect(result.id).toBe('1');
    expect(result.name).toBe('Test User');
    expect(result.role).toBe('USER');
    expect(result.password).toBe('hashed');
    expect(result.posts).toEqual([]);
    expect(result.comments).toEqual([]);
  });

  it('should login a user and return a token', async () => {
    const command = new LoginCommand('test@example.com', 'pass123');
    const hashedPassword = await bcrypt.hash('pass123', 10);

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER',
      posts: [],
      comments: [],
    });
    jest.spyOn(jwtService, 'sign').mockReturnValue('token');

    const result = await service.login(command);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(jwtService.sign).toHaveBeenCalledWith(
      expect.objectContaining({
        sub: '1',
        email: 'test@example.com',
        role: 'USER',
      }),
    );
    expect(result).toEqual({ accessToken: 'token' });
  });

  it('should throw an error for invalid credentials', async () => {
    const command = new LoginCommand('test@example.com', 'wrongpass');

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: await bcrypt.hash('pass123', 10),
      role: 'USER',
      posts: [],
      comments: [],
    });

    await expect(service.login(command)).rejects.toThrow('Invalid credentials');
  });
});
