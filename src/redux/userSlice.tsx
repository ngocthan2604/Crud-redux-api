import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, IUserState } from './UserType';
import { getUserListApi } from './userService';

const initialState: IUserState = {
    list: [],
    listStatus: ApiStatus.ideal,
};

export const getUserListAction = createAsyncThunk('users/getUserListAction', async () => {
    const response = await getUserListApi();
    return response.data;
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
                state.listStatus = ApiStatus.ideal;
                state.list = action.payload;
            })
            .addCase(getUserListAction.rejected, (state) => {
                state.listStatus = ApiStatus.error;
            });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
