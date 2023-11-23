import {createSlice} from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: localStorage.getItem('token') ?? '',
    },

    reducers: {
        updateToken: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('token', action.payload);
        },
        removeToken: (state, action) => {
            state.value = '';
            localStorage.removeItem('token');
        }
    }
});

const { actions, reducer } = tokenSlice;

export const { updateToken, removeToken } = actions;

export const tokenState = (state) => state.token.value;

export default reducer;
