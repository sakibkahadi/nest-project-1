import { Controller, Get, Post } from '@nestjs/common';

@Controller('public/auth')
export class AuthController {
  @Post('register')
  register() {
    return 'Register endpoint';
  }
}
