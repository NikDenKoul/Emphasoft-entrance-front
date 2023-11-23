import AppLayout from "../layouts";
import {useContext, useEffect, useState} from "react";
import DataTable from "../components/data_table";
import {AppContext} from "../AppContext";
import axios from "axios";
import {sortBy} from "lodash";
import UserForm from "./form";
import Button from "../components/button";
import {SERVER_PATH, getRequestOptions} from '../Utils';

const columns = [
    { id: 1, label: 'ID', field: 'id', align: 'left' },
    { id: 2, label: 'Username', field: 'username', align: 'left', filterable: true, type: 'text' },
    { id: 3, label: 'First Name', field: 'first_name', align: 'left' },
    { id: 4, label: 'Last Name', field: 'last_name', align: 'left' },
    { id: 5, label: 'Is Active', field: 'is_active', align: 'center', type: 'boolean' },
    { id: 6, label: 'Last Login', field: 'last_login', align: 'left' },
    { id: 7, label: 'Is Super User', field: 'is_superuser', align: 'left', type: 'boolean' },
];

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const {token, onAlert, onConfirm} = useContext(AppContext);

    const fetchUsers = () => {
        if (!token) return;
        const requestOptions = getRequestOptions('get', token);
        axios(`${SERVER_PATH}users/`, requestOptions)
            .catch((e) => ({ error: e.code, errorMessage: e.message }))
            .then((response) => {
                if (response.error) {
                    onAlert(response.errorMessage || response.error, 'error');
                    return;
                }
                setUsers(sortBy(response.data, 'id'));
            })
    }

    const handleEdit = (id) => {
        const editedUser = users.find((user) => user.id === id);
        if (editedUser) {
            setCurrentUser(editedUser);
            setShowModal(true);
        }
    }

    const handleConfirm = (id) => {
        if (!token) return;

        onConfirm(`Are you sure you want to delete user №${id}?`, { callback: () => handleDelete(id)} );
    }

    const handleDelete = (id) => {
        const requestOptions = getRequestOptions('delete', token);
        axios(`${SERVER_PATH}users/${id}`, requestOptions)
            .catch((e) => ({ error: e.code, errorMessage: e.message }))
            .then((response) => {
                if (response.error) {
                    onAlert(response.errorMessage || response.error, 'error');
                    return;
                }

                const index = users.indexOf(users.find((user) => user.id === id));
                if (index !== -1) {
                    let newUsers = [...users];
                    newUsers.splice(index, 1);
                    setUsers(newUsers)
                    onAlert('User have been deleted.', 'success');
                }
            })
    }

    const handleUserSaved = (newUser) => {
        let newUsers = [...users];
        if (currentUser) {
            const index = users.indexOf(currentUser);
            if (index !== -1) {
                newUsers.splice(index, 1, newUser);
            }
        } else {
            newUsers.push(newUser)
        }
        handleCloseModal();
        setUsers(newUsers);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentUser(null);
    }

    useEffect(() => {
        fetchUsers();
    }, [token])

    return (
        <AppLayout>
            <Button color='green' onClick={() => setShowModal(true)}>CREATE</Button>
            <DataTable columns={columns} rows={users} entityPath='users' onEdit={handleEdit} onDelete={handleConfirm} />
            <UserForm
                userData={currentUser}
                open={showModal}
                onClose={handleCloseModal}
                afterSave={handleUserSaved}
            />
        </AppLayout>
    );
}

export default UsersPage;
