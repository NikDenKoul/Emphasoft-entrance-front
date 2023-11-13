import './index.css';

function MainPage() {
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
                <h4>This is a SPA to manage users:</h4>
                <ul>
                    <li>display users list;</li>
                    <li>create users;</li>
                    <li>update users.</li>
                </ul>
            </main>
            <footer>© My app</footer>
        </div>
    )
}

export default MainPage;
