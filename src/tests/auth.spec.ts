import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../modules/auth/auth.service';
import { UserRepository } from '../modules/auth/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterCommand } from '../modules/auth/commands/register.command';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;

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
    });

    const result = await service.register(command);

    expect(result.email).toBe('test@example.com');
  });
});
