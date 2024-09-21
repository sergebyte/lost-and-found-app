import {
  Injectable,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CookieValidationService } from 'src/cookie-validation/cookie-validation.service';

@Injectable()
export class CheckCookieService {
  constructor(
    private readonly cookieValidationService: CookieValidationService,
  ) {}

  async checkCookie(req: Request, res: Response) {
    const sessionId = req.cookies['sessionId'];

    if (!sessionId) {
      throw new BadRequestException('No session ID provided');
    }

    try {
      const { isValid, userId } =
        await this.cookieValidationService.validateSessionId(sessionId);

      if (isValid) {
        // Return success response with OK status
        return res.status(HttpStatus.OK).json({
          valid: true,
          userId, // Return the userId if session is valid
          message: 'Session is valid.',
        });
      } else {
        throw new UnauthorizedException('Session is invalid or expired.');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during session validation: ' + error.message,
      );
    }
  }
}
