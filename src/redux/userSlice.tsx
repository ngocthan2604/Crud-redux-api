import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, IUserState, UserForm } from './UserType';
import { createUserApi, deleteUserApi, getUserListApi } from './userService';

const initialState: IUserState = {
    list: [],
    deleteId: 0,
    listStatus: ApiStatus.ideal,
    createStatus: ApiStatus.ideal,
    deleteStatus: ApiStatus.ideal,
};

export const getUserListAction = createAsyncThunk('users/getUserListAction', async () => {
    const response = await getUserListApi();
    return response.data;
});

export const createUserAction = createAsyncThunk('users/createUserAction', async (data: UserForm) => {
    const response = await createUserApi(data);
    return response.data;
});

export const deleteUserAction = createAsyncThunk('users/deleteUserAction', async (id: number) => {
    await deleteUserApi(id);
    return id;
});

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserListAction.pending, (state) => {
                state.listStatus = ApiStatus.loading;
            })
            .addCase(getUserListAction.fulfilled, (state, action) => {
                state.listStatus = ApiStatus.success;
                state.list = action.payload;
            })
            .addCase(getUserListAction.rejected, (state) => {
                state.listStatus = ApiStatus.error;
            })
            .addCase(createUserAction.pending, (state) => {
                state.createStatus = ApiStatus.loading;
            })
            .addCase(createUserAction.fulfilled, (state) => {
                state.createStatus = ApiStatus.success;
            })
            .addCase(createUserAction.rejected, (state) => {
                state.createStatus = ApiStatus.error;
            })
            .addCase(deleteUserAction.pending, (state) => {
                state.deleteStatus = ApiStatus.loading;
            })
            .addCase(deleteUserAction.fulfilled, (state, action) => {
                state.deleteStatus = ApiStatus.success;
                state.deleteId = action.payload;
            });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
