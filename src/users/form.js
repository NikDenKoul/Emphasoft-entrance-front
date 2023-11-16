import {useContext, useEffect, useState} from "react";
import Button from "../components/button";
import {Cancel} from "../components/icons";
import TextField from "../components/text_field";
import {AppContext} from "../AppContext";
import axios from "axios";

function UserForm({ userData, open, onClose, afterSave }) {
    const [isOpen, setOpen] = useState(open ?? false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {token, SERVER_PATH, getRequestOptions, validateUsername, validatePassword} = useContext(AppContext);

    const saveUser = () => {
        if (!token) return;
        const requestData = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            password: password,
            is_active: true
        };

        let requestOptions, pathName;
        if (userData) {
            requestOptions = getRequestOptions('put', token, requestData);
            pathName = `${SERVER_PATH}users/${userData.id}/`;
        } else {
            requestOptions = getRequestOptions('post', token, requestData);
            pathName = `${SERVER_PATH}users/`;
        }

        axios(pathName, requestOptions)
            .catch((e) => ({ error: e.code, errorMessage: e.message }))
            .then((response) => {
                if (response.error) {
                    console.error(response.error);
                    return;
                }
                afterSave(response.data);
            });
    }

    const handleEditUsername = (e) => {
        const newValue = e.target.value;
        if (validateUsername(newValue) < 2) {
            setUserName(newValue);
        }
    }

    const handleEditPassword = (e) => {
        const newValue = e.target.value;
        if (validatePassword(newValue) < 2) {
            setPassword(newValue);
        }
    }

    const handleEditFirstName = (e) => {
        const newValue = e.target.value;
        if (newValue.length > 150) return;
        setFirstName(newValue);
    }

    const handleEditLastName = (e) => {
        const newValue = e.target.value;
        if (newValue.length > 150) return;
        setLastName(newValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateUsername(username)) {
            console.error('Invalid username format');
            return;
        }

        if (validatePassword(password)) {
            console.error('Invalid password format');
            return;
        }

        saveUser();
    }

    useEffect(() => {
        setOpen(open);
    }, [open]);

    useEffect(() => {
        setUserName(userData?.username ?? '');
        setPassword('');
        setFirstName(userData?.first_name ?? '');
        setLastName(userData?.last_name ?? '');
    }, [userData])

    return (
        <dialog open={isOpen} className='user-dialog' onClose={onClose}>
            <form id='user-form'>
                <div className='user-dialog__header'>
                    <h3>{userData ? 'Edit user' : 'New user'}</h3>
                    <a className='user-dialog__header__close-btn' onClick={onClose}>
                        <Cancel/>
                    </a>
                </div>
                <TextField label='Username' value={username} onChange={handleEditUsername} />
                <TextField label='Password' value={password} onChange={handleEditPassword} type='password' />
                <TextField label='First Name' value={firstName} onChange={handleEditFirstName} />
                <TextField label='Last Name' value={lastName} onChange={handleEditLastName} />
                <Button onClick={handleSubmit}>Save</Button>
            </form>
        </dialog>
    );
}

export default UserForm;
