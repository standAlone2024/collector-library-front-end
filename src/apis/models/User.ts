import { ROLE } from "@/utils/constans";

export interface User {
    id?: number;
    role: ROLE;
    email: string;
    password: string;
    name?: string;
    phone?: string;
    date: Date;
}