import { MulterError } from "multer";
import { NextFunction, Request, Response } from "express";

export const multerValidation = (location: string) => {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof MulterError) {
      let message;
      switch (error.code) {
        // case "LIMIT_FIELD_COUNT":
        //   return res.status(400).json({
        //     success: false,
        //     message: `Maximum of ${1} pictures allowed per ${location} !!`
        //   });

        case "LIMIT_FILE_SIZE":
          message = `Size of ${error.field} is too larger on ${location.toLowerCase()}`;
          return res.status(400).json({
            success: false,
            message
          });

        case "LIMIT_UNEXPECTED_FILE":
          if (error.field === "gallery") message = `Maximum of 15 ${error.field || "files/images"} are allowed on ${location.toLowerCase()} !!`;
          if (error.field === "ticket_support_files") message = `Maximum of 5 ${error.field || "files/images"} are allowed on ${location.toLowerCase()} !!`;
          message = `Maximum of 1 ${error.field || "file/image"} is allowed on ${location.toLowerCase()} !!`;

          return res.status(400).json({
            success: false,
            message
          });

        default:
          return res.status(400).json({
            success: false,
            message: `Something went wrong, unable to upload files.`
          });
      }
    }

    return next();
  };
};
