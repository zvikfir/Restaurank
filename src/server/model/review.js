let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const MIN_RATE = 1,
    MAX_RATE = 5;

let reviewsSchema = new Schema({
    description: {type: String},
    reviewer: {type: Schema.Types.ObjectId, ref: "User", required: true},
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    creationDate: {type: Date, required: true},
    bathroomQuality: {
        type: Number,
        min: MIN_RATE,
        max: MAX_RATE,
        required: true
    },
    staffKindness: {type: Number, min: MIN_RATE, max: MAX_RATE, required: true},
    cleanliness: {type: Number, min: MIN_RATE, max: MAX_RATE, required: true},
    driveThruQuality: {type: Number, min: 0, max: MAX_RATE, required: true}, // MIN is 0 for no drive-thru
    deliverySpeed: {type: Number, min: 0, max: MAX_RATE, required: true}, // MIN is 0 for no delivery
    foodQuality: {type: Number, min: MIN_RATE, max: MAX_RATE, required: true},
    pictures: [{type: String}]
});

module.exports = mongoose.model("Review", reviewsSchema);
