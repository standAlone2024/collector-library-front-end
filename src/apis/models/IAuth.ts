import { IUser } from '@api/models/IUser';

export interface IAuth {
    token: string,
    user: IUser
}