import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { RegisterCommand } from '../commands/register.command';
import { LoginCommand } from '../commands/login.command';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: User })
  async register(@Body() dto: RegisterDto): Promise<User> {
    return this.authService.register(
      new RegisterCommand(dto.email, dto.name, dto.password),
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, type: String, description: 'JWT token' })
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(new LoginCommand(dto.email, dto.password));
  }
}
