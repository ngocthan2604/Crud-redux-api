import ApiConfig from '../service/ApiConfig';
import HttpsRequest from '../service/HttpsRequest';
import { IUser, UserForm } from './UserType';

export const getUserListApi = async () => {
    return await HttpsRequest.get<IUser[]>(ApiConfig.user);
};

export const createUserApi = async (data: UserForm) => {
    const url = `${ApiConfig.user}/create`;
    return await HttpsRequest.post<IUser>(url, data);
};

export const deleteUserApi = async (id: number) => {
    const url = `${ApiConfig.user}/delete/${id}/`;
    return await HttpsRequest.delete(url);
};
