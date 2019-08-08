import {UsersActionsConstants} from "./constants";

function checkIfUsernameExistsAction(username) {
    return {
        type: UsersActionsConstants.CHECK_IF_USERNAME_EXISTS_ACTION,
        uri: '/api/users/check-username',
        payload: {
            username
        }
    }
}

function checkIfUsernameExistsSuccessAction(usernameExists) {
    return {
        type: UsersActionsConstants.CHECK_IF_USERNAME_EXISTS_SUCCESS_ACTION,
        payload: {
            usernameExists
        }
    }
}

function checkIfUsernameExistsFailureAction(message) {
    return {
        type: UsersActionsConstants.CHECK_IF_USERNAME_EXISTS_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function registerAction(user) {
    return {
        type: UsersActionsConstants.REGISTER_ACTION,
        uri: 'api/users/register',
        payload: {
            ...user
        }
    }
}

function registerSuccessAction() {
    return {
        type: UsersActionsConstants.REGISTER_SUCCESS_ACTION
    }
}

function registerFailureAction(message) {
    return {
        type: UsersActionsConstants.REGISTER_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function checkUserTokenAction() {
    return {
        type: UsersActionsConstants.CHECK_USER_TOKEN_ACTION,
        uri: 'api/users/checkToken'
    }
}

function checkUserTokenSuccessAction(user) {
    return {
        type: UsersActionsConstants.CHECK_USER_TOKEN_SUCCESS_ACTION,
        payload: {
            ...user
        }
    }
}

function checkUserTokenFailureAction(message) {
    return {
        type: UsersActionsConstants.CHECK_USER_TOKEN_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function loginAction(username, password) {
    return {
        type: UsersActionsConstants.LOGIN_ACTION,
        uri: '/api/users/login',
        payload: {
            username,
            password
        }
    }
}

function loginSuccessAction() {
    return {
        type: UsersActionsConstants.LOGIN_SUCCESS_ACTION
    }
}

function loginFailureAction(message) {
    return {
        type: UsersActionsConstants.LOGIN_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function editProfileAction(user) {
    return {
        type: UsersActionsConstants.EDIT_PROFILE_ACTION,
        uri: '/api/users/edit-profile',
        payload: {
            ...user
        }
    }
}

function editProfileSuccessAction(user) {
    return {
        type: UsersActionsConstants.EDIT_PROFILE_SUCCESS_ACTION,
        payload: {
            ...user
        }
    }
}

function editProfileFailureAction(message) {
    return {
        type: UsersActionsConstants.EDIT_PROFILE_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function loadUserProfileAction(username) {
    return {
        type: UsersActionsConstants.LOAD_USER_PROFILE_ACTION,
        uri: '/api/users/profile',
        payload: {
            username
        }
    }
}

function loadUserProfileSuccessAction(user) {
    return {
        type: UsersActionsConstants.LOAD_USER_PROFILE_SUCCESS_ACTION,
        payload: {
            ...user
        }
    }
}

function loadUserProfileFailureAction(message) {
    return {
        type: UsersActionsConstants.LOAD_USER_PROFILE_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function loadSearchUsernamesAction(query) {
    return {
        type: UsersActionsConstants.LOAD_SEARCH_USERNAMES_ACTION,
        uri: '/api/users/search',
        payload: {
            query
        }
    }
}

function loadSearchUsernamesSuccessAction(usernames) {
    return {
        type: UsersActionsConstants.LOAD_SEARCH_USERNAMES_SUCCESS_ACTION,
        payload: {
            usernames
        }
    }
}

function loadSearchUsernamesFailureAction(message) {
    return {
        type: UsersActionsConstants.LOAD_SEARCH_USERNAMES_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

let UsersActions = {
    checkIfUsernameExistsAction,
    checkIfUsernameExistsSuccessAction,
    checkIfUsernameExistsFailureAction,

    registerAction,
    registerSuccessAction,
    registerFailureAction,

    loginAction,
    loginSuccessAction,
    loginFailureAction,

    checkUserTokenAction,
    checkUserTokenSuccessAction,
    checkUserTokenFailureAction,

    editProfileAction,
    editProfileSuccessAction,
    editProfileFailureAction,

    loadUserProfileAction,
    loadUserProfileSuccessAction,
    loadUserProfileFailureAction,

    loadSearchUsernamesAction,
    loadSearchUsernamesSuccessAction,
    loadSearchUsernamesFailureAction,
};

export default UsersActions;
