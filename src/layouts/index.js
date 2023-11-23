import './index.css';
import {useContext} from "react";
import {AppContext} from "../AppContext";
import {useNavigate, Link} from "react-router-dom";

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
                    <Link to='/'>My App</Link>
                </h2>
                <h3>
                    <Link to="/users">Users</Link>
                </h3>
                <h4>
                    {token ? (
                        <span className='logout' onClick={handleLogout}>LOG OUT</span>
                    ) : (
                        <Link to='/auth'>LOG IN</Link>
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
