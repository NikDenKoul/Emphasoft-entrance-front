import './index.css';

function Button({children, color, outlined, onClick}) {
    return (
        <button
            className={`styled-button ${outlined ? 'styled-button__outlined' : ''}`}
            color={color ?? 'neutral'} onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;
