let UsersModel = require("../model/user");
let RestaurantsModel = require("../model/restaurant");
let ReviewsModel = require("../model/review");
const withAuth = require("../middleware");
const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";

function sendUserAuth(user, res) {
    // Issue token
    const username = user.username;
    const payload = {username};
    const token = jwt.sign(payload, secret, {
        expiresIn: "1h"
    });
    res.cookie("token", token, {httpOnly: true}).sendStatus(200);
}

let _handleError = function (err) {
    if (err) return console.log(err);
};

async function getClientUserModel(user) {
    const {username, image, location} = user;

    return ReviewsModel.find({reviewer: user.id}).populate("restaurant reviewer").then(reviews => {
        return {
            user: {
                username,
                image,
                location,
                reviews
            }
        };
    });
}

module.exports = app => {
    app.post("/api/users/check-username", function (req, res, next) {
        UsersModel.findOne({username: req.body.username}).then(function (user) {
            if (user) {
                res.send(true);
            } else {
                res.send(false);
            }
        });
    });
    app.post("/api/users/register", function (req, res) {
        const {username, password, image, location} = req.body;
        const user = new UsersModel({username, password, image, location});
        user.save(function (err) {
            if (err) {
                res.status(500).send("ERROR registering new user please try again");
            } else {
                sendUserAuth(user, res);
            }
        });
    });
    app.post("/api/users/login", function (req, res) {
        const {username, password} = req.body;
        UsersModel.findOne({username}, function (err, user) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    error: "Internal error please try again"
                });
            } else if (!user) {
                res.status(401).json({
                    error: "Incorrect username or password"
                });
            } else {
                user.isCorrectPassword(password, function (err, same) {
                    if (err) {
                        res.status(500).json({
                            error: "Internal error please try again"
                        });
                    } else if (!same) {
                        res.status(401).json({
                            error: "Incorrect username or password"
                        });
                    } else {
                        sendUserAuth(user, res);
                    }
                });
            }
        });
    });
    app.get("/api/users/checkToken", withAuth, function (req, res) {
        UsersModel.findOne({username: req.username}, function (err, user) {
            if (err) {
                res.status(500).json({
                    message: "Internal error user not found"
                });
            } else if (!user) {
                res.clearCookie("token");
                res.status(500).json({
                    message: "ERROR token does not match any user"
                });
            } else {
                // res.status(200).json(getClientUserModel(user));
                getClientUserModel(user).then(clientModel => res.status(200).json(clientModel));
            }
        });
    });
    app.get("/api/users/logout", withAuth, function (req, res) {
        res.clearCookie("token");
        res.redirect("/");
    });
    app.post("/api/users/edit-profile", withAuth, function (req, res) {
        const {oldUsername, username, location} = req.body;
        UsersModel.updateOne(
            {username: oldUsername},
            {$set: {username, location}},
            function (err, updateRes) {
                if (err) {
                    res.status(500).json({
                        message: `ERROR couldn't change user`
                    });
                } else {
                    UsersModel.findOne({username}, function (err, user) {
                        if (err) {
                            res.status(500).json({
                                message: "ERROR something went wrong with edit-profile"
                            });
                        } else {
                            // res.status(200).json(getClientUserModel(user));
                            getClientUserModel(user).then(clientModel => res.status(200).json(clientModel));
                        }
                    });
                }
            }
        );
    });
    app.post("/api/users/profile", function (req, res) {
        const {username} = req.body;
        UsersModel.findOne({username}, function (err, user) {
            if (err || !user) {
                res.status(500).json({
                    message: `ERROR couldn't find user with this username`
                });
            } else {
                getClientUserModel(user).then(clientModel => res.status(200).json(clientModel));
            }
        });
    });
    app.post("/api/users/search", function (req, res) {
        const {query} = req.body;
        UsersModel.find(
            {
                $or: [
                    {username: new RegExp(query, "i")},
                    {"location.label": new RegExp(query, "i")}
                ]
            },
            "username"
        )
            .then(users => users.map(user => user.username))
            .then(usernames => {
                res.status(200).json({
                    usernames
                });
            })
            .catch(e => {
                console.log(e);
                res.status(500).json({
                    message: "ERROR Couldn't search user"
                });
            });
    });
};
