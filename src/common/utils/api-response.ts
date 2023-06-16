import { Response } from "express";
import { HttpStatus } from "../enums";

abstract class ApiResponse {
  constructor(protected status: HttpStatus, protected message: string) {}

  public send(res: Response, headers: { [key: string]: string } = {}) {
    return res.status(this.status).json({
      success: false,
      message: this.message
    });
  }
}

export class ConflictResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
