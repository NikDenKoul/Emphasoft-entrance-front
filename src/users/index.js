import AppLayout from "../layouts";
import {useEffect, useState} from "react";

function UsersPage() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        // some code...
        setUsers([]);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <AppLayout>
            <div>Users are here</div>
        </AppLayout>
    );
}

export default UsersPage;
