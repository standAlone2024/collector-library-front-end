import { ROLE } from "@/utils/constans";

export interface IUser {
    id?: number;
    role: ROLE;
    email: string;
    password: string;
    name?: string;
    phone?: string;
    date: Date;
}