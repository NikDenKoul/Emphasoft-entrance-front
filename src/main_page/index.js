import './index.css';
import AppLayout from "../layouts";

function MainPage() {
    return (
        <AppLayout>
            <h4>This is a SPA to manage users:</h4>
            <ul>
                <li>display users list;</li>
                <li>create users;</li>
                <li>update users.</li>
            </ul>
        </AppLayout>
    )
}

export default MainPage;
