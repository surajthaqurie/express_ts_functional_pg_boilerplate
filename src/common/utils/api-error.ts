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
        return new ConflictResponse(err.message).sendResponse(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).sendResponse(res);
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
