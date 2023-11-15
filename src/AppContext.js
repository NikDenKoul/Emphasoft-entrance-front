import {createContext} from "react";

export const AppContext = createContext({
    SERVER_PATH: '',
    token: null,
    login: () => {},
    logout: () => {},
    getRequestOptions: () => {},
    validateUsername: () => {},
    validatePassword: () => {}
});
