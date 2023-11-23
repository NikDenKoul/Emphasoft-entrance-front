import Button from "../button";

function ConfirmModal({open, message, onConfirm, onClose}) {
    return (
        <dialog open={open} onClose={onClose}>
            <form id='confirm-modal-form'>
                <h3>{message}</h3>
                <div className='row-container'>
                    <Button onClick={onConfirm} color='red'>CONFIRM</Button>
                    <Button onClick={onClose} color='neutral'>CANCEL</Button>
                </div>
            </form>
        </dialog>
    )
}

export default ConfirmModal;
