import './App.css';
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import AuthPage from "./auth_page";
import MainPage from "./main_page";
import UsersPage from "./users";
import {AppContext} from "./AppContext";
import {useEffect, useState} from "react";
import UserPage from "./users/[id]";
import ConfirmModal from "./components/confirm_modal";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainPage
    },
    {
        path: '/users/',
        loader: protectedLoader,
        children: [
            {
                index: true,
                Component: UsersPage,
            },
            {
                path: ':id',
                Component: UserPage
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthPage,
        loader: authLoader
    }
]);

function App() {
    const [token, setToken] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [afterConfirm, setAfterConfirm] = useState(() => {});

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    const handleConfirm = (message, callback) => {
        setConfirmMessage(message);
        setAfterConfirm(callback);
    }

    const handleCloseConfirmModal = (e) => {
        e.preventDefault();
        setConfirmMessage('');
    }

    const handleAfterConfirm = (e) => {
        handleCloseConfirmModal(e)
        afterConfirm?.callback();
    }

    const makeContextValue = () => {
        return {
            token: token,
            login: login,
            logout: logout,
            onConfirm: handleConfirm
        }
    }

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        setToken(localStorageToken);
    }, [])

    return (
        <AppContext.Provider value={makeContextValue()}>
            <RouterProvider router={router} />
            <ConfirmModal open={!!confirmMessage.length} message={confirmMessage} onConfirm={handleAfterConfirm}
                          onClose={handleCloseConfirmModal}/>
        </AppContext.Provider>
    );
}

export default App;

// --------------------

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
