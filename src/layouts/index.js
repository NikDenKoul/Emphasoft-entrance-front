import './index.css';

function AppLayout({children}) {
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
                    <a>LOG OUT</a>
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
