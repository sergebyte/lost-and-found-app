import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AuthJwtGuard } from './auth-jwt.guard';

@Controller('profile')
export class TestController {
  @UseGuards(AuthJwtGuard)
  @Get()
  getProfile(@Request() req) {
    const userId = req.user['userId']; // Extract userId
    return { message: 'This is a protected route!', userId };
  }
}
