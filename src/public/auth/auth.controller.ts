import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Message } from 'src/common/decorators/message/message.decorator';

@Controller('public/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Message('User registered successfully')
  register(@Body() payload: RegisterDto) {
    return this.authService.createUser(payload);
  }
}
