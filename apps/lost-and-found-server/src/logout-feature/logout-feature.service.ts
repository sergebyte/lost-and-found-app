import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionManagementService } from 'src/session-management/session-management.service';
import { Response, Request } from 'express';

@Injectable()
export class LogoutFeatureService {
  constructor(private readonly sessionService: SessionManagementService) {}

  async logout(req: Request, res: Response): Promise<void> {
    const sessionId = req.cookies['sessionId'];
    if (!sessionId) {
      throw new Error('No session ID provided.');
    }
    // Delete the session from the database
    await this.sessionService.deleteSession(sessionId);

    // Clear the session cookie
    res.clearCookie('sessionId');
  }
}
