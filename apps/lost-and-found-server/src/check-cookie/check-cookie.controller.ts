import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CheckCookieService } from './check-cookie.service';

@Controller('cookie-validation')
export class CheckCookieController {
  constructor(private readonly checkCookieService: CheckCookieService) {}

  @Get('check')
  async checkCookie(@Req() req: Request, @Res() res: Response) {
    return this.checkCookieService.checkCookie(req, res);
  }
}
