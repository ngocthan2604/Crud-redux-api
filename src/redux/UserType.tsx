export interface IUser {
    id: number;
    name: string;
    age: number;
    description: string;
}

export enum ApiStatus {
    'loading',
    'ideal',
    'success',
    'error',
}

export interface IUserState {
    list: IUser[];
    deleteId: number;
    listStatus: ApiStatus;
    createStatus: ApiStatus;
    deleteStatus: ApiStatus;
}

export interface UserForm {
    name: string;
    age: number;
    description: string;
}
