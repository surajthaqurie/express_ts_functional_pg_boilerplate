import { Response } from "express";
import { ErrorType } from "../enums";
import { ConflictResponse, BadRequestResponse } from "./api-response";

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, override message: string) {
    super(type);
  }

  public static handleError(err: ApiError, res: Response): any {
    switch (err.type) {
      case ErrorType.CONFLICT_REQUEST:
        return new ConflictResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
    }
  }
}

export class ConflictRequestError extends ApiError {
  constructor(message: string) {
    super(ErrorType.CONFLICT_REQUEST, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(ErrorType.BAD_REQUEST, message);
  }
}

// statusCode: number;
// success: boolean;
// isOperational: boolean;

// constructor(message: string, statusCode: number) {
//   super(message);
//   this.message = message;
//   this.statusCode = statusCode || 500;
//   this.success = false;
//   this.isOperational = true;

//   Error.captureStackTrace(this, this.constructor);
// }
