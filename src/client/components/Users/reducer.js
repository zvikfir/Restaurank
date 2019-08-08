import initialState from "../../initialState";
import {UsersActionsConstants} from "./constants";

const UsersReducer = (state = initialState.users, action) => {
    console.log("UsersReducerState=", state);
    console.log("RECEIVED ACTION:", action);
    switch (action.type) {
        case UsersActionsConstants.CHECK_IF_USERNAME_EXISTS_SUCCESS_ACTION:
            console.log("RECEIVED CHECK_IF_USERNAME_EXISTS_SUCCESS_ACTION");
            state = state.set("usernameExists", action.payload.usernameExists);
            console.log("NEW STATE=", state);
            return state;
        case UsersActionsConstants.CHECK_USER_TOKEN_SUCCESS_ACTION:
            console.log("RECEIVED CHECK_USER_TOKEN_SUCCESS_ACTION");
            state = state.set("userAuthenticated", true);
            state = state.set("isAuthenticating", false);
            state = state.set("user", action.payload.user);
            console.log("NEW STATE=", state);
            return state;
        case UsersActionsConstants.CHECK_USER_TOKEN_FAILURE_ACTION:
            console.log("RECEIVED CHECK_USER_TOKEN_FAILURE_ACTION");
            state = state.set("isAuthenticating", false);
            state = state.set("userAuthenticated", false);
            state = state.set("user", null);
            console.log("NEW STATE=", state);
            return state;
        case UsersActionsConstants.REGISTER_SUCCESS_ACTION:
            console.log("RECEIVED REGISTER_SUCCESS_ACTION");
            state = state.set("userAuthenticated", true);
            return state;
        case UsersActionsConstants.LOGIN_SUCCESS_ACTION:
            console.log("RECEIVED LOGIN_SUCCESS_ACTION");
            state = state.set("loginMessage", "Login Successful");
            state = state.set("userAuthenticated", true);
            return state;
        case UsersActionsConstants.LOGIN_FAILURE_ACTION:
            console.log("RECEIVED LOGIN_FAILURE_ACTION ", action.payload.message);
            state = state.set("loginMessage", action.payload.message);
            return state;
        case UsersActionsConstants.EDIT_PROFILE_SUCCESS_ACTION:
            console.log('RECEIVED EDIT_PROFILE_SUCCESS_ACTION');
            state = state.set("user", action.payload.user);
            return state;
        case UsersActionsConstants.LOAD_USER_PROFILE_SUCCESS_ACTION:
            console.log('RECEIVED LOAD_USER_PROFILE_SUCCESS_ACTION');
            state = state.set('userProfile', action.payload.user);
            return state;
        case UsersActionsConstants.LOAD_SEARCH_USERNAMES_SUCCESS_ACTION:
            console.log('RECEIVED LOAD_SEARCH_USERNAMES_SUCCESS_ACTION');
            state = state.set('search', action.payload.usernames);
            return state;
        default:
            //otherwise state is lost!
            return state;
    }
};

export default UsersReducer;
