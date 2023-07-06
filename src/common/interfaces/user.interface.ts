import { IAuthSignupPayload } from "./auth.interface";
import { IDbBaseProperties } from "./common.interface";

type ROLE = "USER" | "ADMIN" | "STAFF";

export interface IUser extends IDbBaseProperties, IAuthSignupPayload {
  role: ROLE;
  avatar: string | null;
  deletedAt: Date | null;
}
