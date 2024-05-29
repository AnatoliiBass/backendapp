import type { User } from "../types";

export type UserReturnModel = Omit<User, 'password' | 'created_at' | 'emailConfirmation'>;