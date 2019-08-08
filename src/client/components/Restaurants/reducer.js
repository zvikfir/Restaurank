import initialState from "../../initialState";
import { List } from "immutable";
import { RestaurantsActionsConstants } from "./constants";
import { getDistance } from "geolib";

const RestaurantsReducer = (state = initialState.restaurants, action) => {
  console.log("RestaurantsReducerState=", state);
  console.log("RECEIVED ACTION:", action);
  switch (action.type) {
    case RestaurantsActionsConstants.LOAD_RESTAURANTS_SUCCESS_ACTION:
      console.log("RECEIVED LOAD_RESTAURANTS_SUCCESS_ACTION");
      state = state.set("restaurants", new List(action.payload.restaurants));
      state = state.set(
        "filteredRestaurants",
        new List(action.payload.restaurants)
      );
      console.log("NEW STATE=", state);
      return state;
    case RestaurantsActionsConstants.LOAD_RESTAURANT_DETAILS_SUCCESS_ACTION:
      console.log("RECEIVED LOAD_RESTAURANT_DETAILS_SUCCESS_ACTION");
      state = state.set("restaurant", action.payload.restaurant);
      state = state.set(
        "filteredRestaurantReviews",
        action.payload.restaurant.reviews
      );
      return state;
    case RestaurantsActionsConstants.DELETE_REVIEW_SUCCESS_ACTION:
      console.log("RECEIVED DELETE_REVIEW_SUCCESS_ACTION");
      state = state.updateIn(["restaurant", "reviews"], reviews =>
        reviews.filter(r => r._id !== action.payload.reviewId)
      );
      return state;
    case RestaurantsActionsConstants.FILTER_RESTAURANTS_ACTION:
      console.log("RECEIVED FILTER_RESTAURANTS_ACTION");
      const {
        name,
        location,
        minimumScore,
        closerBetterScale
      } = action.payload.query;
      const restaurants = state.get("restaurants");
      let filteredRestaurants = restaurants
        .filter(r => new RegExp(name, "i").test(r.name))
        .filter(r => r.rating >= minimumScore)
        .sort((a, b) => (a.rating > b.rating ? -1 : 1));
      if (location) {
        filteredRestaurants = filteredRestaurants
          .map(r => {
            const distanceInKM =
              getDistance(
                { latitude: location.lat, longitude: location.lng },
                {
                  latitude: r.location.location.lat,
                  longitude: r.location.location.lng
                }
              ) / 1000; // distance is given in meters
            // divide by 500KM, assuming 500KM is max distance, to get a number in range of 0 to 5
            const closerScore =
              (1 - closerBetterScale) * (5 - distanceInKM / 83);
            const betterScore = closerBetterScale * r.rating;
            const score = closerScore + betterScore;
            console.log(r.name, closerScore, betterScore, score);

            return { ...r, score: score };
          })
          .sort((a, b) => (a.score > b.score ? -1 : 1));
      }
      state = state.set("filteredRestaurants", filteredRestaurants);
      return state;
    case RestaurantsActionsConstants.SORT_RESTAURANT_REVIEWS_ACTION:
      console.log("RECEIVED SORT_RESTAURANT_REVIEWS_ACTION");
      const restaurantReviews = state.getIn(["restaurant", "reviews"]);
      let sort = action.payload.sort;
      let filteredRestaurantReviews = restaurantReviews;

      filteredRestaurantReviews = filteredRestaurantReviews.filter(
        review =>
          Math.ceil(
            (new Date() - new Date(review.creationDate)) / (1000 * 60 * 60 * 24)
          ) < sort.creationDate.timeLapseInDays
      );

      const topicName = sort.topic.name;
      if (topicName != "none") {
        filteredRestaurantReviews = filteredRestaurantReviews.filter(
          review => review[topicName] >= sort.topic.threshold
        );
      }

      const creationDateSortType = sort.creationDate.type;
      if (creationDateSortType === "newest") {
        filteredRestaurantReviews = filteredRestaurantReviews.sort((a, b) =>
          a.creationDate > b.creationDate ? -1 : 1
        );
      } else {
        filteredRestaurantReviews = filteredRestaurantReviews.sort((a, b) =>
          a.creationDate > b.creationDate ? 1 : -1
        );
      }

      state = state.set("filteredRestaurantReviews", filteredRestaurantReviews);
      return state;
    default:
      //otherwise state is lost!
      return state;
  }
};

export default RestaurantsReducer;
