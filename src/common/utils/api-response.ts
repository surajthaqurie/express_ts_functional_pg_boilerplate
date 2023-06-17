import { Response } from "express";
import { HttpStatus } from "../enums";

abstract class ApiResponse {
  constructor(protected status: HttpStatus, protected success: boolean, protected message: string) {}

  protected prepareResponse<T extends ApiResponse>(res: Response, response: T, headers: { [key: string]: string }): Response {
    return res.status(this.status).json(ApiResponse.sanitizeResponse(response));
  }

  public sendResponse(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepareResponse<ApiResponse>(res, this, headers);
  }

  private static sanitizeResponse<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];

    return clone;
  }
}

export class ConflictResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, false, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, false, message);
  }
}

export class SuccessResponse<T> {
  status: number;
  message: string;
  response: T;

  constructor(status: number, message: string, response: T) {
    this.response = response;
    this.message = message;
    this.status = status;
  }

  public sendResponse(res: Response) {
    return res.status(this.status).json({
      success: true,
      message: this.message,
      data: this.response
    });
  }
}
