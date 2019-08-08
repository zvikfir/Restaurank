import {all} from 'redux-saga/effects'
import AppSaga from './components/App/saga'
import RestaurantsSaga from './components/Restaurants/saga'
import UsersSaga from './components/Users/saga';

export default function* Sagas() {
    yield all([
        AppSaga(),
        RestaurantsSaga(),
        UsersSaga(),
    ])
}
