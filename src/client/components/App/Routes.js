import React from "react";
import {Route, Switch} from "react-router-dom";
import ViewRestaurants from "../Restaurants/ViewRestaurants";
import RestaurantSearch from "../Restaurants/RestaurantSearch";
import checkToken from "../Users/checkToken";
import Restaurant from "../Restaurants/Restaurant";
import Login from "../Users/Login";
import Register from "../Users/Register";
import UserProfile from "../Users/UserProfile";
import EditReview from "../Restaurants/EditReview";
import withAuth from "../Users/withAuth";
import AddRestaurant from "../Restaurants/AddRestaurant";

export default () =>
    <Switch>
        <Route path="/" exact component={ViewRestaurants}/>
        <Route path="/restaurants" exact component={ViewRestaurants}/>
        <Route path="/search" component={RestaurantSearch}/>
        <Route path="/restaurants/reviews/edit" component={withAuth(EditReview)}/>
        <Route path="/details" component={checkToken(Restaurant)}/>
        <Route path="/add" component={AddRestaurant}/>
        <Route path="/profile" component={checkToken(UserProfile)}/>
        <Route path="/login" component={checkToken(Login)}/>
        <Route path="/register" component={checkToken(Register)}/>
    </Switch>;
