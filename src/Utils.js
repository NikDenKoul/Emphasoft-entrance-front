/** @readonly */
const VALIDATE_RESULT = {
    INVALID: 2,
    INTERMEDIATE: 1,
    ACCEPTABLE: 0
}

const SERVER_PATH = 'https://test-assignment.emphasoft.com/api/v1/';

function getRequestOptions(method, token, data = undefined) {
    return {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token
        },
        data: data
    }
}

function validateUsername(newValue) {
    if (!/^[\w.@+-]*$/.test(newValue) || newValue.length > 150) {
        return VALIDATE_RESULT.INVALID;
    }

    if (/^[\w.@+-]+$/.test(newValue)) {
        return VALIDATE_RESULT.ACCEPTABLE;
    }

    return VALIDATE_RESULT.INTERMEDIATE;
}

function validatePassword (newValue) {
    if (!/^.*$/.test(newValue) || newValue.length > 128) {
        return VALIDATE_RESULT.INVALID;
    }

    if (/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(newValue)) {
        return VALIDATE_RESULT.ACCEPTABLE;
    }

    return VALIDATE_RESULT.INTERMEDIATE;
}

export {VALIDATE_RESULT, SERVER_PATH, getRequestOptions, validateUsername, validatePassword};
