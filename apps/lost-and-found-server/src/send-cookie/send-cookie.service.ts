import {
  Injectable,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { SessionManagementService } from 'src/session-management/session-management.service';

@Injectable()
export class SendCookieService {
  constructor(private readonly sessionService: SessionManagementService) {}

  async createAndSetSession(userId: string, res: Response) {
    try {
      // Generate a unique session ID
      const sessionId = await this.sessionService.generateUniqueSessionId();

      // Set the expiration date for the session (30 days from now)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      // Create the session in the database
      await this.sessionService.createSession(
        sessionId,
        userId,
        expirationDate,
      );

      // Set a cookie with the session ID that expires in 30 days
      res.cookie('sessionId', sessionId, {
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Secure flag in production
        expires: expirationDate, // Set cookie expiration
      });

      // Return success response
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Session created and cookie set' });
    } catch (error) {
      // Throw an InternalServerErrorException for NestJS to handle
      throw new InternalServerErrorException(
        'Error creating session: ' + error.message,
      );
    }
  }
}
