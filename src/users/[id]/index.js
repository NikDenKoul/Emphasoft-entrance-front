import AppLayout from "../../layouts";
import {useMatch} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../AppContext";
import axios from "axios";
import {Check, Cancel} from "../../components/icons";
import '../index.css';

function ProfileElement({label, value, type}) {
    return (
        <div className='profile-data__element'>
            <b>{label}: </b>
            {type === 'boolean' ? (
                value ? <Check color='green'/> : <Cancel color='red'/>
            ) : type === 'date' ? (
                value ? new Date(value).toLocaleString() : <i>None</i>
            ) : (
                value ?? <i>None</i>
            )}
        </div>
    )
}

function UserPage() {
    const match = useMatch('/users/:id');
    const userId = match.params.id;
    const [user, setUser] = useState({});
    const {token, SERVER_PATH, getRequestOptions} = useContext(AppContext);

    const fetchUser = () => {
        if (!token || !userId) return;
        const requestOptions = getRequestOptions('get', token);
        axios(`${SERVER_PATH}users/${userId}/`, requestOptions)
            .catch((e) => ({ error: e.code, errorMessage: e.message }))
            .then((response) => {
                if (response.error) {
                    console.error(response.error);
                    return;
                }

                setUser(response.data);
            });
    }

    useEffect(() => {
        fetchUser();
    }, [token]);

    return (
        <AppLayout>
            <h3>User №{userId}</h3>
            <div className='profile-data'>
                <ProfileElement label='Username' value={user.username} />
                <ProfileElement label='First name' value={user.first_name} />
                <ProfileElement label='Last name' value={user.last_name} />
                <ProfileElement label='Is active' value={user.is_active} type='boolean' />
                <ProfileElement label='Last login' value={user.last_login} type='date' />
                <ProfileElement label='Is superuser' value={user.is_superuser} type='boolean' />
            </div>
        </AppLayout>
    )
}

export default UserPage;
