import AppLayout from "../layouts";
import {useEffect, useState} from "react";
import DataTable from "../components/data_table";

const columns = [
    { id: 1, label: 'ID', field: 'id', align: 'left' },
    // { id: 2, label: 'Username', field: 'username', align: 'left' },
    { id: 3, label: 'First Name', field: 'first_name', align: 'left' },
    { id: 4, label: 'Last Name', field: 'last_name', align: 'left' },
    { id: 5, label: 'Is Active', field: 'is_active', align: 'center', type: 'boolean' },
    { id: 6, label: 'Last Login', field: 'last_login', align: 'left' },
    { id: 7, label: 'Is Super User', field: 'is_superuser', align: 'left', type: 'boolean' },
];

function UsersPage() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        // some code...
        setUsers([
            {
                id: 0,
                username: ".Li0hmQyPRjfyYG+L9XTzo3tHiisBu4BXa_oYa53zhQzJtHk6OAebYRHhGWMh4KNfE58Bq0i+iauOX3UprlIpOtO58vX++TK",
                first_name: "string",
                last_name: "string",
                is_active: true,
                last_login: "2023-11-13T21:34:00.912Z",
                is_superuser: false
            }
        ]);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <AppLayout>
            <DataTable columns={columns} rows={users} entityPath='users' />
        </AppLayout>
    );
}

export default UsersPage;
