import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default values for unexpected errors
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong, please try again later.';
    let code = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof ThrottlerException) {
      // Handle known ThrottlerExceptions
      status = exception.getStatus();
      code = 'ERROR_TOO_MANY_REQUESTS';
      message = 'Too many requests, please try again later.';
    } else if (exception instanceof BadRequestException) {
      // Handle known BadRequestExceptions
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      code = 'ERROR_BAD_REQUEST';
      message = exceptionResponse.message;
    } else if (exception instanceof HttpException) {
      // Handle known HttpExceptions
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      code = exceptionResponse.code;
      message = exceptionResponse.message;
    } else {
      // Log the unknown error for debugging
      console.error('Uncaught exception:', exception);
    }

    // Send the structured error response
    response.status(status).json({
      statusCode: status,
      code,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
