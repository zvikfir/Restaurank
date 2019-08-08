import {combineReducers} from 'redux';
import AppReducer from './components/App/reducer';
import RestaurantsReducer from './components/Restaurants/reducer';
import UsersReducer from './components/Users/reducer';

export default combineReducers({
    app: AppReducer,
    restaurants: RestaurantsReducer,
    users: UsersReducer,
});
