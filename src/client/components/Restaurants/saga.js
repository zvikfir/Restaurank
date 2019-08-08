import {RestaurantsActionsConstants} from "./constants";
import {all, call, put, takeEvery} from "redux-saga/effects";
import RestaurantActions from "./actions";

function* addRestaurant(action) {
    console.log("RestaurantsSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        yield put(RestaurantActions.addRestaurantSuccessAction());
    } catch (e) {
        yield put(RestaurantActions.addRestaurantFailureAction(e.message));
    }
}

function* addRestaurantSaga() {
    yield takeEvery(
        RestaurantsActionsConstants.ADD_RESTAURANT_ACTION,
        addRestaurant
    );
}

function* loadRestaurants(action) {
    console.log("RestaurantsSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = yield call([res, "json"]);
        yield put(RestaurantActions.loadRestaurantsActionSuccessAction(json));
    } catch (e) {
        yield put(RestaurantActions.loadRestaurantsActionFailureAction(e.message));
    }
}

function* loadRestaurantsSaga() {
    yield takeEvery(
        RestaurantsActionsConstants.LOAD_RESTAURANTS_ACTION,
        loadRestaurants
    );
}

function* loadRestaurantDetails(action) {
    console.log("RestaurantsSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        const json = yield call([res, "json"]);
        yield put(RestaurantActions.loadRestaurantDetailsSuccessAction(json));
    } catch (e) {
        yield put(RestaurantActions.loadRestaurantDetailsFailureAction(e.message));
    }
}

function* loadRestaurantDetailsSaga() {
    yield takeEvery(
        RestaurantsActionsConstants.LOAD_RESTAURANT_DETAILS_ACTION,
        loadRestaurantDetails
    );
}

function* addReview(action) {
    console.log("RestaurantsSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        yield put(RestaurantActions.addReviewSuccessAction());
    } catch (e) {
        yield put(RestaurantActions.addReviewFailureAction(e.message));
    }
}

function* addReviewSaga() {
    yield takeEvery(RestaurantsActionsConstants.ADD_REVIEW_ACTION, addReview);
}

function* deleteReview(action) {
    console.log("RestaurantsSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        const json = yield call([res, "json"]);
        yield put(RestaurantActions.deleteReviewSuccessAction(json.id));
    } catch (e) {
        yield put(RestaurantActions.deleteReviewFailureAction(e.message));
    }
}

function* deleteReviewSaga() {
    yield takeEvery(
        RestaurantsActionsConstants.DELETE_REVIEW_ACTION,
        deleteReview
    );
}

function* editReview(action) {
    console.log("RestaurantsSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        if (res.status === 200) {
            yield put(RestaurantActions.editReviewSuccessAction());
        } else {
            const json = yield call([res, "json"]);
            yield put(RestaurantActions.editReviewFailureAction(json.message));
        }
    } catch (e) {
        yield put(RestaurantActions.editReviewFailureAction(e.message));
    }
}

function* editReviewSaga() {
    yield takeEvery(RestaurantsActionsConstants.EDIT_REVIEW_ACTION, editReview);
}

function* RestaurantsSaga() {
    yield all([
        addRestaurantSaga(),
        loadRestaurantsSaga(),
        loadRestaurantDetailsSaga(),
        addReviewSaga(),
        deleteReviewSaga(),
        editReviewSaga()
    ]);
}

export default RestaurantsSaga;
