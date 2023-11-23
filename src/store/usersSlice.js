import { createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        value: []
    },
    reducers: {
        setUsers(state, action) {
            if (state.value.length === 0 && Array.isArray(action.payload)) {
                state.value = action.payload;
            }
        },
        addUser(state, action) {
            state.value.push(action.payload);
        },
        editUser(state, action) {
            const usersList = state.value;
            const editedUser = usersList.find((item) => item.id === action.payload.id);
            const index = usersList.indexOf(editedUser);
            if (index !== -1) {
                usersList.splice(index, 1, action.payload);
            }
        },
        deleteUser(state, action) {
            const usersList = state.value;
            const deletedUser = usersList.find((item) => item.id === action.payload);
            const index = usersList.indexOf(deletedUser);
            if (index !== -1) {
                usersList.splice(index, 1);
            }
        }
    }
});

const { actions, reducer } = usersSlice;

export const { setUsers, addUser, editUser, deleteUser } = actions;

export const usersState = (state) => state.users.value;

export default reducer;
