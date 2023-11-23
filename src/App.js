import './App.css';
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import AuthPage from "./auth_page";
import MainPage from "./main_page";
import UsersPage from "./users";
import {AppContext} from "./AppContext";
import {useState} from "react";
import UserPage from "./users/[id]";
import ConfirmModal from "./components/confirm_modal";
import Notification from "./components/notification";
import {Provider} from "react-redux";
import store from "./store";

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
    const [confirmMessage, setConfirmMessage] = useState('');
    const [afterConfirm, setAfterConfirm] = useState(() => {});
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStyle, setAlertStyle] = useState(() => {});

    const handleAlert = (message, color) => {
        setAlertMessage(message);
        setAlertStyle(color);
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
            onAlert: handleAlert,
            onConfirm: handleConfirm
        }
    }

    return (
        <Provider store={store}>
            <AppContext.Provider value={makeContextValue()}>
                <RouterProvider router={router} />
                <Notification open={!!alertMessage.length} message={alertMessage} color={alertStyle}
                              onClose={() => setAlertMessage('')}/>
                <ConfirmModal open={!!confirmMessage.length} message={confirmMessage} onConfirm={handleAfterConfirm}
                              onClose={handleCloseConfirmModal}/>
            </AppContext.Provider>
        </Provider>
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
