import {useContext, useState} from "react";
import {AppContext} from "../AppContext";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './index.css';
import {VALIDATE_RESULT, SERVER_PATH, validateUsername, validatePassword} from '../Utils';

const Field = ({label, value, type, error, onEdit}) => {
    return (
        <div className='form__field'>
            <label>{label}</label>
            <div className='form__field__input-container' data-error={error.length > 0} data-error-message={error}>
                <input value={value} type={type} onChange={onEdit}/>
            </div>
        </div>
    );
};

function AuthPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const {login, onAlert} = useContext(AppContext);

    const handleEditUsername = (e) => {
        const newValue = e.target.value;
        if (validateUsername(newValue) !== VALIDATE_RESULT.INVALID) {
            setUsername(newValue);
        }
    }

    const handleEditPassword = (e) => {
        const newValue = e.target.value;
        if (validatePassword(newValue) !== VALIDATE_RESULT.INVALID) {
            setPassword(newValue);
        }
    }

    const isUsernameValid = () => {
        if (validateUsername(username) !== VALIDATE_RESULT.ACCEPTABLE) {
            setUsernameError('Unappropriated username');
            return false;
        }

        setUsernameError('');
        return true;
    }

    const isPasswordValid = () => {
        if (validatePassword(password) !== VALIDATE_RESULT.ACCEPTABLE) {
            setPasswordError('Must be 8 characters at least and contain letters (at least 1 capital) and digits');
            return false;
        }

        setPasswordError('');
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isUsernameValid() || !isPasswordValid()) return;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: username,
                password: password
            }
        }
        axios(`${SERVER_PATH}login/`, requestOptions)
            .catch((e) => ({ error: e.code, errorMessage: e.message }))
            .then((response) => {
                if (response.error) {
                    onAlert(response.errorMessage || response.error, 'error')
                    return;
                }

                login(response.data.token);
                navigate('/');
            });
    }

    return (
        <div className='form-page-main'>
            <form onSubmit={handleSubmit} id='login-form'>
                <Link to='/'>← Home</Link>
                <Field value={username} label="Username:" type="text" onEdit={handleEditUsername} error={usernameError} />
                <Field value={password} label="Password:" type="password" onEdit={handleEditPassword} error={passwordError} />
                <button type="submit" className='form__submit'>Submit</button>
            </form>
        </div>
    )
}

export default AuthPage;
