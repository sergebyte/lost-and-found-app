import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  private errorMessages = {
    INVALID_EMAIL: {
      code: 'ERROR_INVALID_EMAIL',
      message: 'A valid email is required.',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    OTP_EMPTY: {
      code: 'ERROR_OTP_EMPTY',
      message: 'A valid OTP is required.',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    INVALID_OTP: {
      code: 'ERROR_INVALID_OTP',
      message: 'Not a valid OTP.',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    USER_EXPIRED: {
      code: 'ERROR_USER_EXPIRED',
      message: 'User session has expired.',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
    OTP_EXPIRED: {
      code: 'ERROR_OTP_EXPIRED',
      message: 'OTP expired or not found.',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    INVALID_TOKEN: {
      code: 'ERROR_INVALID_TOKEN',
      message: 'Invalid token.',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
    USER_NOT_FOUND: {
      code: 'ERROR_USER_NOT_FOUND',
      message: 'The user was not found.',
      statusCode: HttpStatus.NOT_FOUND,
    },
    TOO_MANY_REQUESTS: {
      code: 'ERROR_TOO_MANY_REQUESTS',
      message: 'Too many requests, please try again later.',
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    },
    INTERNAL_SERVER_ERROR: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong, please try again later.',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    },
  };

  getError(errorCode: string) {
    return (
      this.errorMessages[errorCode] || this.errorMessages.INTERNAL_SERVER_ERROR
    );
  }

  handleError(errorCode: string) {
    const error = this.getError(errorCode);
    throw new HttpException(
      {
        statusCode: error.statusCode,
        code: error.code,
        message: error.message,
      },
      error.statusCode,
    );
  }
}
