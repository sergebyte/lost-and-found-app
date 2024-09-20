import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { SendCookieService } from './send-cookie.service';

@Controller('session-management')
export class SendCookieController {
  constructor(private readonly sendCookieService: SendCookieService) {}

  @Post('create')
  async createSession(@Body('userId') userId: string, @Res() res: Response) {
    return this.sendCookieService.createAndSetSession(userId, res);
  }
}
