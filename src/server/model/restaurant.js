let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let restaurantsSchema = new Schema({
    name: {type: String, required: true},
    location: {type: Map, required: true},
    rating: {type: Number},
    nbReviews: {type: Number}
});

module.exports = mongoose.model("Restaurant", restaurantsSchema);