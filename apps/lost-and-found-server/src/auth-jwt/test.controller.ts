import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthJwtGuard } from './auth-jwt.guard';

@Controller('profile')
export class TestController {
  @UseGuards(AuthJwtGuard)
  @Get()
  getProfile() {
    return { message: 'This is a protected route!' };
  }
}
