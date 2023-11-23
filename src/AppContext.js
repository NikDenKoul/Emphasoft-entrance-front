import {createContext} from "react";

export const AppContext = createContext({
    token: null,
    login: () => {},
    logout: () => {}
});
