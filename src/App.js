import './App.css';
import {createBrowserRouter, redirect, RouterProvider, navigate} from "react-router-dom";
import AuthPage from "./auth_page";
import MainPage from "./main_page";
import UsersPage from "./users";
import {AppContext} from "./AppContext";
import {useEffect, useState} from "react";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainPage
    },
    {
        path: '/users',
        Component: UsersPage,
        loader: protectedLoader
    },
    {
        path: '/auth',
        Component: AuthPage,
        loader: authLoader
    }
]);

function protectedLoader() {
    const token = localStorage.getItem('token');
    if (token == null) {
        return redirect('/auth');
    }
    return null;
}

function authLoader() {
    const token = localStorage.getItem('token');
    if (token != null) {
        return redirect('/');
    }
    return null;
}

function App() {
    const [token, setToken] = useState(null);

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    const makeContextValue = () => {
        return {
            SERVER_PATH: 'https://test-assignment.emphasoft.com/api/v1/',
            token: token,
            login: login,
            logout: logout
        }
    }

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        setToken(localStorageToken);
    }, [])

    return (
        <AppContext.Provider value={makeContextValue()}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    );
}

export default App;
