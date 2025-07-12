import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(' ').length != 2
    ) {
      throw new BadRequestException('Authorization header is missing');
    }

    return next();
  }
}
