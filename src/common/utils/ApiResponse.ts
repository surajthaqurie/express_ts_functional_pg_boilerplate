import { Response } from "express";
import { HttpStatus } from "../enums";
import { API_ERROR_MESSAGE } from "../constants";

abstract class ApiResponse {
  constructor(protected HttpStatus: HttpStatus, protected status: HttpStatus, protected message: string) {}

  protected prepare<T extends ApiResponse>(res: Response, response: T, headers: { [key: string]: string }): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }
  public send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<ApiResponse>(res, this, headers);
  }
  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = API_ERROR_MESSAGE.AUTHENTICATION_FAILURE) {
    super(HttpStatus.UNAUTHORIZED, HttpStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = API_ERROR_MESSAGE.NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND, message);
  }

  override send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<NotFoundResponse>(res, this, headers);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = API_ERROR_MESSAGE.FORBIDDEN) {
    super(HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = API_ERROR_MESSAGE.BAD_PARAMETERS) {
    super(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = API_ERROR_MESSAGE.INTERNAL_SERVER_ERROR) {
    super(HttpStatus.INTERNAL_ERROR, HttpStatus.INTERNAL_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatus.SUCCESS, HttpStatus.SUCCESS, message);
  }
}

export class SuccessCreatedMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatus.CREATED, HttpStatus.CREATED, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatus.SUCCESS, HttpStatus.SUCCESS, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string /* private data: T */) {
    super(HttpStatus.SUCCESS, HttpStatus.SUCCESS, message);
  }

  override send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = "refresh_token";

  constructor(message = API_ERROR_MESSAGE.ACCESS_TOKEN_INVALID) {
    super(HttpStatus.UNAUTHORIZED, HttpStatus.UNAUTHORIZED, message);
  }

  override send(res: Response, headers: { [key: string]: string } = {}): Response {
    headers.instruction = this.instruction;
    return super.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(message: string /* private accessToken: string, private refreshToken: string */) {
    super(HttpStatus.SUCCESS, HttpStatus.SUCCESS, message);
  }

  override send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<TokenRefreshResponse>(res, this, headers);
  }
}
