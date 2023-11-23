import {Alert, Snackbar} from "@mui/material";

function Notification({open, onClose, color, message}) {
    return (
        <Snackbar open={open} autoHideDuration={3000} transitionDuration={200}
                  onClose={onClose} >
            <Alert onClose={onClose}
                   severity={color} sx={{ width: '100%' }} >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
