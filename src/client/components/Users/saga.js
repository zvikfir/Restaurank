import {UsersActionsConstants} from "./constants";
import {all, call, put, takeEvery} from "redux-saga/effects";
import UsersActions from "./actions";

function* checkIfUsernameExists(action) {
    console.log("UsersSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        const json = yield call([res, "json"]);
        yield put(UsersActions.checkIfUsernameExistsSuccessAction(json));
    } catch (e) {
        console.log(e);
        yield put(UsersActions.checkIfUsernameExistsFailureAction(e.message));
    }
}

function* checkIfUsernameExistsSaga() {
    yield takeEvery(
        UsersActionsConstants.CHECK_IF_USERNAME_EXISTS_ACTION,
        checkIfUsernameExists
    );
}

function* register(action) {
    console.log("UsersSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        yield put(UsersActions.registerSuccessAction());
    } catch (e) {
        yield put(UsersActions.registerFailureAction(e.message));
    }
}

function* registerSaga() {
    yield takeEvery(UsersActionsConstants.REGISTER_ACTION, register);
}

function* login(action) {
    console.log("UsersSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        if (res.status === 200) {
            yield put(UsersActions.loginSuccessAction());
        } else {
            const json = yield call([res, "json"]);
            yield put(UsersActions.loginFailureAction(json.error));
        }
    } catch (e) {
        yield put(UsersActions.loginFailureAction(e.message));
    }
}

function* loginSaga() {
    yield takeEvery(UsersActionsConstants.LOGIN_ACTION, login);
}

function* checkUserToken(action) {
    console.log("UsersSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.status === 200) {
            const json = yield call([res, "json"]);
            yield put(UsersActions.checkUserTokenSuccessAction(json));
        } else {
            yield put(
                UsersActions.checkUserTokenFailureAction("ERROR Invalid token")
            );
        }
    } catch (e) {
        yield put(UsersActions.checkUserTokenFailureAction(e.message));
    }
}

function* checkUserTokenSaga() {
    yield takeEvery(
        UsersActionsConstants.CHECK_USER_TOKEN_ACTION,
        checkUserToken
    );
}

function* editProfile(action) {
    console.log("UsersSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        if (res.status === 200) {
            const json = yield call([res, "json"]);
            yield put(UsersActions.editProfileSuccessAction(json));
        } else {
            yield put(
                UsersActions.editProfileFailureAction("ERROR Invalid token")
            );
        }
    } catch (e) {
        yield put(UsersActions.editProfileFailureAction(e.message));
    }
}

function* editProfileSaga() {
    yield takeEvery(UsersActionsConstants.EDIT_PROFILE_ACTION, editProfile);
}

function* loadUserProfile(action) {
    console.log("UsersSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        if (res.status === 200) {
            const json = yield call([res, "json"]);
            yield put(UsersActions.loadUserProfileSuccessAction(json));
        } else {
            yield put(
                UsersActions.loadUserProfileFailureAction(json.message)
            );
        }
    } catch (e) {
        yield put(UsersActions.loadUserProfileFailureAction(e.message));
    }
}

function* loadUserProfileSaga() {
    yield takeEvery(UsersActionsConstants.LOAD_USER_PROFILE_ACTION, loadUserProfile);
}

function* loadSearchUsernames(action) {
    console.log("UsersSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        if (res.status === 200) {
            const json = yield call([res, "json"]);
            yield put(UsersActions.loadSearchUsernamesSuccessAction(json.usernames));
        } else {
            yield put(
                UsersActions.loadSearchUsernamesFailureAction(json.message)
            );
        }
    } catch (e) {
        yield put(UsersActions.loadSearchUsernamesFailureAction(e.message));
    }
}

function* loadSearchUsernamesSaga() {
    yield takeEvery(UsersActionsConstants.LOAD_SEARCH_USERNAMES_ACTION, loadSearchUsernames);
}


function* UsersSaga() {
    yield all([
        checkIfUsernameExistsSaga(),
        registerSaga(),
        checkUserTokenSaga(),
        loginSaga(),
        editProfileSaga(),
        loadUserProfileSaga(),
        loadSearchUsernamesSaga(),
    ]);
}

export default UsersSaga;
