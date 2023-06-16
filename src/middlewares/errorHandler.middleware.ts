// import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "src/common/utils";

// const sendErrorToDev = function (error: any, res: Response): any {
//   return res.status(error.statusCode).json({
//     success: error.success,
//     error,
//     message: error.message,
//     stack: error.stack
//   });
// };

// const sendErrorToProd = function (error: any, res: Response): any {
//   if (error instanceof Prisma.PrismaClientValidationError) {
//     console.log(error.message);
//   } else {
//     return res.status(error.statusCode).json({
//       success: error.success !== undefined ? error.success : false,
//       message: error.message
//     });
//   }
// };

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  console.log("----------------", err instanceof ApiError);

  if (err instanceof ApiError) {
    return ApiError.handleError(err, res);
  }
  // let prismaClientValidationError = err instanceof Prisma.PrismaClientValidationError;

  // let prismaClientKnownRequestError = err instanceof Prisma.PrismaClientKnownRequestError;

  // if (prismaClientKnownRequestError) {
  //   if (err.code === "P2002") {
  //     let name = err.meta.target[0];
  //     return res.status(400).json({
  //       success: false,
  //       message: `This ${name} already exists. Please choose different ${name}`
  //     });
  //   }
  // }

  // if (!prismaClientValidationError) {
  //   if (process.env.NODE_ENV === "development") {
  //     sendErrorToDev(err, res);
  //   } else if (process.env.NODE_ENV === "production") {
  //     let error = { ...err };
  //     error.message = err.message;
  //     sendErrorToProd(error, res);
  //   }
  // } else {
  //   return res.status(err.statusCode).json({
  //     success: false,
  //     message: err.message
  //   });
  // }
  // return res.status(400).json({
  //   success: false,
  //   message: err.message
  // });
};
