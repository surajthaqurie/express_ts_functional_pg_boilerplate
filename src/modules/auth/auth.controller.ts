import { NextFunction, Request, Response } from "express";

import authService from "./auth.service";
import { SuccessCreatedResponse } from "src/common/utils";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { catchAsyncHandler } from "src/helpers";
import { IAuthSignup } from "src/common/interfaces";

const signup = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const user = await authService.signup(req.body);
  return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);

  /* ************** Swagger Documentation  **************
#swagger.tags = ["Auth"]
#swagger.description = "Api for user signup."
#swagger.summary = "User signup."
#swagger.operationId = "signup"
#swagger.requestBody = {
  required: true,
  content: {
      "application/json": {
          schema: {
              $ref: "#/definitions/AuthSignupPayload"
          }  
      },
  }
}    
#swagger.responses[400] = { 
  description: "Bad input request." 
}
#swagger.responses[400] = { 
  description: "Password and confirm password doesn't matched." 
} 
#swagger.responses[409] = {
  ifStatusPresent: true,
  description: "This email was already taken. Please choose different email."
}
#swagger.responses[409] = { 
  description: "This username was already taken. Please choose different username."
} 
#swagger.responses[409] = { 
  description: "This phone was already taken. Please choose different phone." 
} 

#swagger.responses[400] = { 
  description: "Unable to signup !!" 
} 
#swagger.responses[201] = {
  description: "Successfully signup !!",
   schema: { $ref: "#/definitions/AuthSignupSuccess" }
  }

************** Swagger Documentation  ************** */
};

export default {
  signup: catchAsyncHandler(signup)
};
