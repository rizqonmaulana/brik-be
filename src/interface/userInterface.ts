import { UserRole } from "../model/user";

export interface CreateUser {
    name: string;
    username: string;
    password: string;
    role: UserRole.CUSTOMER
}