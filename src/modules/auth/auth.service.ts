import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { RegisterCommand } from './commands/register.command';
import { LoginCommand } from './commands/login.command';
import { GetUserQuery } from './queries/get-user.query';
import { User } from './entities/user.entity';
import { hashPassword, comparePassword } from '../../common/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(command: RegisterCommand): Promise<User> {
    const hashedPassword = await hashPassword(command.password);
    const user = new User();
    user.email = command.email;
    user.name = command.name;
    user.password = hashedPassword;
    user.role = 'USER';
    return this.userRepository.save(user);
  }

  async login(command: LoginCommand): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user || !(await comparePassword(command.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async getUser(query: GetUserQuery): Promise<User | null> {
    return this.userRepository.findByEmail(query.email);
  }
}
