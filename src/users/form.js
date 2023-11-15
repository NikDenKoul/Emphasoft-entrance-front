import {useContext, useEffect, useState} from "react";
import Button from "../components/button";
import {Cancel} from "../components/icons";
import TextField from "../components/text_field";
import {AppContext} from "../AppContext";
import axios from "axios";
import {sortBy} from "lodash";

function UserForm({ isEdit, open, onClose, afterSave }) {
    const [isOpen, setOpen] = useState(open ?? false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {token, SERVER_PATH, getRequestOptions, validateUsername, validatePassword} = useContext(AppContext);

    const createUser = () => {
        if (!token) return;
        const requestData = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            password: password,
            is_active: true
        };
        const requestOptions = getRequestOptions('post', token, requestData);
        axios(`${SERVER_PATH}users/`, requestOptions)
            .catch((e) => ({ error: e.code, errorMessage: e.message }))
            .then((response) => {
                console.log(response);
                if (response.error) {
                    console.error(response.error);
                    return;
                }
                afterSave({ ...requestData, is_superuser: false });
                handleClose();
            })
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

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateUsername(username) || validatePassword(password)) {
            console.log('error');
            return;
        }

        if (isEdit) {
            console.error('Method is not available');
        } else {
            createUser();
        }
    }

    useEffect(() => {
        setOpen(open);
    }, [open]);

    return (
        <dialog open={isOpen} className='user-dialog' onClose={handleClose}>
            <form id='user-form'>
                <div className='user-dialog__header'>
                    <h3>{isEdit ? 'Edit user' : 'New user'}</h3>
                    <a className='user-dialog__header__close-btn' onClick={handleClose}>
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
