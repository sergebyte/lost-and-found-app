import { Injectable, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CookieValidationService } from 'src/cookie-validation/cookie-validation.service';

@Injectable()
export class CheckCookieService {
  constructor(
    private readonly cookieValidationService: CookieValidationService,
  ) {}

  async checkCookie(req: Request, res: Response) {
    const sessionId = req.cookies['sessionId']; // Access the cookie named 'sessionId'

    if (!sessionId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        valid: false,
        message: 'No session ID provided',
      });
    }

    try {
      const isValid =
        await this.cookieValidationService.validateSessionId(sessionId);

      if (isValid) {
        return res.status(HttpStatus.OK).json({
          valid: true,
          message: 'Session is valid.',
        });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          valid: false,
          message: 'Session is invalid or expired.',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        valid: false,
        message: 'An error occurred during session validation.',
      });
    }
  }
}
