import {RestaurantsActionsConstants} from "./constants";

function addRestaurantAction(restaurant) {
    return {
        type: RestaurantsActionsConstants.ADD_RESTAURANT_ACTION,
        uri: "api/restaurants/add",
        payload: {
            ...restaurant
        }
    };
}

function addRestaurantSuccessAction() {
    return {
        type: RestaurantsActionsConstants.ADD_RESTAURANT_SUCCESS_ACTION
    };
}

function addRestaurantFailureAction(message) {
    return {
        type: RestaurantsActionsConstants.ADD_RESTAURANT_FAILURE_ACTION,
        message
    };
}

function loadRestaurantsAction() {
    return {
        type: RestaurantsActionsConstants.LOAD_RESTAURANTS_ACTION,
        uri: "api/restaurants/view"
    };
}

function loadRestaurantsActionSuccessAction(restaurants) {
    return {
        type: RestaurantsActionsConstants.LOAD_RESTAURANTS_SUCCESS_ACTION,
        payload: {
            restaurants
        }
    };
}

function loadRestaurantsActionFailureAction(message) {
    return {
        type: RestaurantsActionsConstants.LOAD_RESTAURANTS_FAILURE_ACTION,
        message
    };
}

function loadRestaurantDetailsAction(restaurantId) {
    return {
        type: RestaurantsActionsConstants.LOAD_RESTAURANT_DETAILS_ACTION,
        uri: '/api/restaurants/details',
        payload: {
            id: restaurantId
        }
    }
}

function loadRestaurantDetailsSuccessAction(restaurant) {
    return {
        type: RestaurantsActionsConstants.LOAD_RESTAURANT_DETAILS_SUCCESS_ACTION,
        payload: {
            restaurant
        }
    }
}

function loadRestaurantDetailsFailureAction(message) {
    return {
        type: RestaurantsActionsConstants.LOAD_RESTAURANT_DETAILS_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function addReviewAction(review) {
    return {
        type: RestaurantsActionsConstants.ADD_REVIEW_ACTION,
        uri: '/api/restaurants/reviews/add',
        payload: {
            ...review
        }
    }
}

function addReviewSuccessAction() {
    return {
        type: RestaurantsActionsConstants.ADD_RESTAURANT_SUCCESS_ACTION
    }
}

function addReviewFailureAction(message) {
    return {
        type: RestaurantsActionsConstants.ADD_REVIEW_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function filterRestaurantsAction(query) {
    return {
        type: RestaurantsActionsConstants.FILTER_RESTAURANTS_ACTION,
        payload: {
            query
        }
    }
}

function deleteReviewAction(id) {
    return {
        type: RestaurantsActionsConstants.DELETE_REVIEW_ACTION,
        uri: '/api/restaurants/reviews/delete',
        payload: {
            id
        }
    }
}

function deleteReviewSuccessAction(reviewId) {
    return {
        type: RestaurantsActionsConstants.DELETE_REVIEW_SUCCESS_ACTION,
        payload: {
            reviewId
        }
    }
}

function deleteReviewFailureAction(message) {
    return {
        type: RestaurantsActionsConstants.DELETE_REVIEW_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function editReviewAction(review) {
    return {
        type: RestaurantsActionsConstants.EDIT_REVIEW_ACTION,
        uri: '/api/restaurants/reviews/edit',
        payload: {
            review
        }
    }
}

function editReviewSuccessAction() {
    return {
        type: RestaurantsActionsConstants.EDIT_REVIEW_SUCCESS_ACTION
    }
}

function editReviewFailureAction(message) {
    return {
        type: RestaurantsActionsConstants.EDIT_REVIEW_FAILURE_ACTION,
        payload: {
            message
        }
    }
}

function sortRestaurantReviewsAction(sort) {
    return {
        type: RestaurantsActionsConstants.SORT_RESTAURANT_REVIEWS_ACTION,
        payload: {
            sort
        }
    }
}

let RestaurantActions = {
    addRestaurantAction,
    addRestaurantSuccessAction,
    addRestaurantFailureAction,

    loadRestaurantsAction,
    loadRestaurantsActionSuccessAction,
    loadRestaurantsActionFailureAction,

    loadRestaurantDetailsAction,
    loadRestaurantDetailsSuccessAction,
    loadRestaurantDetailsFailureAction,

    addReviewAction,
    addReviewSuccessAction,
    addReviewFailureAction,

    filterRestaurantsAction,

    deleteReviewAction,
    deleteReviewSuccessAction,
    deleteReviewFailureAction,

    editReviewAction,
    editReviewSuccessAction,
    editReviewFailureAction,

    sortRestaurantReviewsAction,
};

export default RestaurantActions;
