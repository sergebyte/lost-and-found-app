import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogoutFeatureService } from './logout-feature.service'; // Adjust the path as needed

@Controller()
export class LogoutFeatureController {
  constructor(private readonly logoutService: LogoutFeatureService) {}

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      await this.logoutService.logout(req, res);
      return res.status(HttpStatus.OK).json({
        message: 'Successfully logged out.',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error during logout.',
        error: error.message,
      });
    }
  }
}
