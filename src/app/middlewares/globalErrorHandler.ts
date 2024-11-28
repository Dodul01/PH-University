/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Error
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message: msg,
    error: err.name || 'InternalServerError',
    stack: err.stack,
  });
};

export default globalErrorHandler;
