// success-handler.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SuccessHandlerService {
  private successMessages = {
    SUCCESS_UNKNOWN: {
      code: 'SUCCESS_UNKNOWN',
      message: 'Operation completed successfully.',
      statusCode: 200,
    },
    OTP_SENT: {
      code: 'SUCCESS_OTP_SENT',
      message: 'OTP has been sent successfully.',
      statusCode: 200,
    },
    USER_AUTHENTICATED: {
      code: 'SUCCESS_USER_AUTHENTICATED',
      message: 'User authenticated successfully.',
      statusCode: 200,
    },
    USER_CREATED: {
      code: 'SUCCESS_USER_CREATED',
      message: 'User account created successfully.',
      statusCode: 201,
    },
    USER_UPDATED: {
      code: 'SUCCESS_USER_UPDATED',
      message: 'User updated successfully.',
      statusCode: 200,
    },
    USER_DELETED: {
      code: 'SUCCESS_USER_DELETED',
      message: 'User account deleted successfully.',
      statusCode: 200,
    },
    USER_FOUND: {
      code: 'SUCCESS_USER_FOUND',
      message: 'User retrieved successfully.',
      statusCode: 200,
    },
  };

  getSuccessMessage(successCode: string) {
    return (
      this.successMessages[successCode] || this.successMessages.SUCCESS_UNKNOWN
    );
  }

  handleSuccess(successCode: string, additionalData: any = {}) {
    const success = this.getSuccessMessage(successCode);
    return {
      statusCode: success.statusCode,
      code: success.code,
      message: success.message,
      data: additionalData,
    };
  }
}
