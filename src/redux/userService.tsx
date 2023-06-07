import ApiConfig from '../service/ApiConfig';
import HttpsRequest from '../service/HttpsRequest';
import { IUser } from './UserType';

export const getUserListApi = async () => {
    return await HttpsRequest.get<IUser[]>(ApiConfig.user);
};
