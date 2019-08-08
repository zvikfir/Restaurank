let RestaurantsModel = require("../model/restaurant");
let UsersModel = require("../model/user");
let ReviewsModel = require("../model/review");
const withAuth = require("../middleware");

function calcReviewAverageRating(review) {
    const {
        bathroomQuality,
        staffKindness,
        cleanliness,
        driveThruQuality,
        deliverySpeed,
        foodQuality
    } = review;
    const ratings = [
        bathroomQuality,
        staffKindness,
        cleanliness,
        driveThruQuality,
        deliverySpeed,
        foodQuality
    ];
    const relevant_ratings = ratings.filter(r => r !== 0);
    const nb_elements = relevant_ratings.length;
    const sum = relevant_ratings.reduce((a, b) => a + b, 0);

    return sum / nb_elements;
}

let _handleError = function (err) {
    if (err) return console.log(err);
};

module.exports = app => {
    app.get("/api/restaurants/view", function (req, res, next) {
        RestaurantsModel.find({}, "name location rating").then(restaurants => {
            res.send(restaurants);
        });
    });
    app.post("/api/restaurants/details", function (req, res) {
        const {id} = req.body;
        RestaurantsModel.findOne({_id: id})
            .lean()
            .then(r => {
                ReviewsModel.find({restaurant: id})
                    .populate("reviewer", "username image")
                    .then(reviews => {
                        r.reviews = reviews;
                        res.status(200).send(r);
                    });
            });
    });
    app.post("/api/restaurants/add", function (req, res, next) {
        const {name, location} = req.body;
        let restaurant = new RestaurantsModel({
            name,
            location,
            rating: 0,
            nbReviews: 0
        });
        restaurant
            .save(restaurant)
            .then(doc => {
                res.status(200);
            })
            .catch(e => {
                res.status(500).json({
                    message: "ERROR Couldn't add new restaurant"
                });
            });
    });
    app.post("/api/restaurants/reviews/add", withAuth, function (req, res) {
        UsersModel.findOne({username: req.username})
            .then(reviewer => {
                let {review} = req.body;
                review.reviewer = reviewer.id;
                review.creationDate = new Date();

                RestaurantsModel.findOne({_id: req.body.restaurant}).then(
                    restaurant => {
                        review.restaurant = restaurant.id;
                        new ReviewsModel(review).save().then(doc => {
                            restaurant.rating =
                                (restaurant.rating * restaurant.nbReviews +
                                    calcReviewAverageRating(doc)) /
                                (restaurant.nbReviews + 1);
                            restaurant.nbReviews += 1;
                            new RestaurantsModel(restaurant).save();
                            res.status(200);
                        });
                    }
                );
            })
            .catch(e => {
                res.status(500).json({
                    message: "ERROR couldn't add review"
                });
            });
    });
    app.post("/api/restaurants/reviews/delete", withAuth, function (req, res) {
        ReviewsModel.findOne({_id: req.body.id})
            .populate("reviewer", "username")
            .populate("restaurant")
            .then(review => {
                if (review.reviewer.username !== req.username) {
                    res
                        .status(500)
                        .json({message: "ERROR Unauthorized to delete review"});
                }
                const restaurant = review.restaurant;
                if (restaurant.nbReviews === 1) {
                    restaurant.rating = 0;
                } else {
                    restaurant.rating =
                        (restaurant.rating * restaurant.nbReviews -
                            calcReviewAverageRating(review)) /
                        (restaurant.nbReviews - 1);
                }
                restaurant.nbReviews -= 1;
                new RestaurantsModel(restaurant).save().then(() => {
                    ReviewsModel.deleteOne({_id: review.id}).then(() =>
                        res.status(200).json({id: review.id})
                    );
                });
            });
    });
    app.post("/api/restaurants/reviews/edit", withAuth, function (req, res) {
        const {review} = req.body;
        ReviewsModel.findOne({_id: review.id})
            .populate("restaurant")
            .populate("reviewer", "username")
            .then(oldReview => {
                if (req.username !== oldReview.reviewer.username) {
                    res
                        .status(500)
                        .json({message: "ERROR Unauthorized action EDIT REVIEW"});
                }

                const oldReviewRating = calcReviewAverageRating(oldReview);
                const {
                    description,
                    bathroomQuality,
                    staffKindness,
                    cleanliness,
                    driveThruQuality,
                    deliverySpeed,
                    foodQuality,
                    pictures
                } = review;
                ReviewsModel.updateOne(
                    {_id: review.id},
                    {
                        $set: {
                            description,
                            bathroomQuality,
                            staffKindness,
                            cleanliness,
                            driveThruQuality,
                            deliverySpeed,
                            foodQuality,
                            pictures
                        }
                    }
                )
                    .then(() => {
                        const restaurant = oldReview.restaurant;
                        restaurant.rating =
                            (restaurant.rating * restaurant.nbReviews -
                                oldReviewRating +
                                calcReviewAverageRating(review)) /
                            restaurant.nbReviews;
                        new RestaurantsModel(restaurant).save();
                    })
                    .then(() => res.status(200));
            })
            .catch(e => {
                console.log(e);
                res.status(500).json({message: "ERROR EDITING REVIEW"});
            });
    });
};
