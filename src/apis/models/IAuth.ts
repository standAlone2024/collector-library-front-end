import { IUser } from '@/apis/models/IUser';

export interface IAuth {
    token: string,
    user: IUser
}