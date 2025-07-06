import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { RegisterCommand } from './commands/register.command';
import { LoginCommand } from './commands/login.command';
import { GetUserQuery } from './queries/get-user.query';
import { User } from './entities/user.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    register(command: RegisterCommand): Promise<User>;
    login(command: LoginCommand): Promise<{
        accessToken: string;
    }>;
    getUser(query: GetUserQuery): Promise<User | null>;
}
