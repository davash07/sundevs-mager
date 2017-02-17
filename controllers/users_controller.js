/**
 * Created by devios on 23/01/17.
 */
/**
 * Created by devios on 19/01/17.
 */
var passport = require("passport");
var UserModel = require('../models/user');
var OkrModel = require('../models/okr');
var LocalStrategy = require("passport-local").Strategy;

function show(req, res) {
    UserModel.findOne({_id: req.params.id}, function(err, user) {
        OkrModel.findOne({user_id: req.user._id}, function (err, okr) {
            res.render("profile/index", {user: user, okr:okr});
        });
    });
}

function edit(req, res) {
    UserModel.findOne({_id: req.user._id}, function(err, user) {
        console.log("Edit2");
        res.render("profile/edit", {user: user});
    });
}

function update(req, res, next) {
    UserModel.update({_id: req.params.id}, {$set: {
        name : req.body.name,
        email :  req.body.email,
        bio : req.body.bio,
        rol : req.body.rol
    }}, function(err) {
        if(err) {
            console.log("Update Error:", err);
        }
        else {
            console.log("Update");
            res.redirect("/profile");
        }
    });
}


exports.show = show;
exports.edit = edit;
exports.update = update;
