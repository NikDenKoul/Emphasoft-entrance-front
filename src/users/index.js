import AppLayout from "../layouts";
import {useContext, useEffect, useState} from "react";
import DataTable from "../components/data_table";
import {AppContext} from "../AppContext";
import axios from "axios";
import {sortBy} from "lodash";

const columns = [
    { id: 1, label: 'ID', field: 'id', align: 'left' },
    { id: 2, label: 'Username', field: 'username', align: 'left', filterable: true, type: 'text' },
    { id: 3, label: 'First Name', field: 'first_name', align: 'left' },
    { id: 4, label: 'Last Name', field: 'last_name', align: 'left' },
    { id: 5, label: 'Is Active', field: 'is_active', align: 'center', type: 'boolean' },
    { id: 6, label: 'Last Login', field: 'last_login', align: 'left' },
    { id: 7, label: 'Is Super User', field: 'is_superuser', align: 'left', type: 'boolean' },
];

function getRequestOptions(method, token, data = undefined) {
    return {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token
        },
        data: data
    }
}

function UsersPage() {
    const [users, setUsers] = useState([]);
    const {token, SERVER_PATH} = useContext(AppContext);

    const fetchUsers = () => {
        if (!token) return;
        const requestOptions = getRequestOptions('get', token);
        axios(`${SERVER_PATH}users`, requestOptions)
            .catch((e) => ({ error: e.status, errorMessage: e.statusMessage }))
            .then((response) => {
                if (response.error) {
                    console.error(response.error);
                    return;
                }
                setUsers(sortBy(response.data, 'id'));
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [token])

    return (
        <AppLayout>
            <DataTable columns={columns} rows={users} entityPath='users' />
        </AppLayout>
    );
}

export default UsersPage;
