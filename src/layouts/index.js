import './index.css';
import {useContext} from "react";
import {AppContext} from "../AppContext";
import {useNavigate} from "react-router-dom";

function AppLayout({children}) {
    const {token, logout} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className='App'>
            <header>
                <h2>
                    <a href='/'>My App</a>
                </h2>
                <h3>
                    <a href="/users">Users</a>
                </h3>
                <h4>
                    {token ? (
                        <span className='logout' onClick={handleLogout}>LOG OUT</span>
                    ) : (
                        <a href='/auth'>LOG IN</a>
                    )}
                </h4>
            </header>
            <main>
                {children}
            </main>
            <footer>© My app</footer>
        </div>
    );
}

export default AppLayout;
