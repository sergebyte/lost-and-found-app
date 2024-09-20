import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Session,
  SessionDocument,
} from '../session-management/session-management.schema';

@Injectable()
export class CookieValidationService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async validateSessionId(sessionId: string): Promise<boolean> {
    const session = await this.sessionModel.findOne({ sessionId }).exec();
    if (!session) {
      return false;
    }
    // Check if the session is expired
    return new Date() <= session.expiresAt;
  }
}
