import { Schema, Document } from 'mongoose';

export interface RefreshTokenDocument extends Document {
  refreshToken: string; // Store the hashed token here
  userId: string; // Reference to the user
  createdAt: Date; // When the token was created
  expiresAt: Date; // When the token will expire
  revoked: boolean; // If the token has been revoked or blacklisted
}

export const RefreshTokenSchema = new Schema<RefreshTokenDocument>({
  refreshToken: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
});

// Index to automatically delete expired tokens
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
