import './index.css';

function Button({children, color, onClick}) {
    return (
        <button className='styled-button' color={color ?? 'neutral'} onClick={onClick}>{children}</button>
    )
}

export default Button;
