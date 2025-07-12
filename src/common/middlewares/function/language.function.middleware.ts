import { Request, Response, NextFunction } from 'express';

export const setLanguage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.headers['accept-language'] = req.headers['accept-language']
    ? req.headers['accept-language']
    : `${process.env.EN_LANG}`;

  return next();
};
