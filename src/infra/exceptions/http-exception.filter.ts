import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../database/prisma/prisma.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private prisma: PrismaService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json(exception.getResponse());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private safelySerialize(obj: any): any {
    if (!obj) return obj;

    try {
      // Convert to JSON and back to remove non-serializable properties
      return JSON.parse(JSON.stringify(obj));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // If serialization fails, return simplified object
      return {
        serializationError: true,
        message: 'Object contained non-serializable data',
      };
    }
  }
}
