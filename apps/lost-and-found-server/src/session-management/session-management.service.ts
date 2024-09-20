import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './session-management.schema';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

@Injectable()
export class SessionManagementService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  // Generate a unique session ID
  async generateUniqueSessionId(): Promise<string> {
    let sessionId: string;
    let isUnique = false;

    while (!isUnique) {
      sessionId = uuidv4(); // Generate a UUID
      const existingSession = await this.sessionModel
        .findOne({ sessionId })
        .exec();
      if (!existingSession) {
        isUnique = true; // Unique session ID found
      }
    }

    return sessionId;
  }

  // Create a new session
  async createSession(
    sessionId: string,
    userId: string,
    expiresAt: Date,
  ): Promise<Session> {
    const newSession = new this.sessionModel({ sessionId, userId, expiresAt });
    return newSession.save();
  }

  // Find a session by sessionId
  async findSession(sessionId: string): Promise<Session | null> {
    return this.sessionModel.findOne({ sessionId }).exec();
  }

  // Delete a session
  async deleteSession(sessionId: string): Promise<void> {
    const result = await this.sessionModel.deleteOne({ sessionId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Session not found');
    }
  }
}
