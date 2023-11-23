import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './tokenSlice';
import usersReducer from "./usersSlice";

export default configureStore({
    reducer: {
        token: tokenReducer,
        users: usersReducer
    }
});
