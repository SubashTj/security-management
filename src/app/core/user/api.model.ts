import { IUser } from './user.interface';

export interface IUserAPI {
    message: string,
    user: IUser,
    pageSize?: number;
    page?: number;
}