import './index.css';

function TextField({label, value, type, onChange, vertical}) {
    return (
        <div className={`text-field ${vertical ? 'text-field__vertical' : ''}`}>
            <label>{label}</label>
            <input type={type ?? 'text'} value={value} onChange={onChange} placeholder={label} />
        </div>
    );
}

export default TextField;
