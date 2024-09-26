import { UserResponseType } from "../types/UserResponseType";
import { UserType } from "../types/UserType";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>
        }
    }
}