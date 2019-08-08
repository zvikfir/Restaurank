const {List, Map} = require('immutable');

export default {
    users: Map({
        'usernameExists': false,
        'userAuthenticated': false,
        'isAuthenticating': true,
        'loginMessage': '',
        'user': null,
        'search': List()
    }),
    restaurants: Map({
        'restaurants': List(),
        'filteredRestaurants': List(),
        'filteredRestaurantReviews': List(),
        'restaurant': null,
    }),
    gallery: Map({
        images: List(),
        openLightBox: false,
        activeImage: 0,
        activeFilter: List(),
        galleryWidth: 0
    }),
    app: Map({
        size: 200,
        tag: 'art',
        tags: List()
    })
};
