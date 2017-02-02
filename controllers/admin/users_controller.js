/**
 * Created by devios on 23/01/17.
 */
/**
 * Created by devios on 19/01/17.
 */
var passport = require("passport");
var UserModel = require('../../models/user');
var LocalStrategy = require("passport-local").Strategy;

function index (req, res) {
    UserModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, users) {
            if(err){
                return next(err);
            }
            res.render("admin/user/index", {users : users});
        });
}

function show(req, res) {
}

function edit(req, res) {
    UserModel.findOne({_id: req.params.id}, function(err, user) {
        console.log("Edit");
        res.render("admin/user/edit", {user: user});
    });
}

function destroy(req, res) {

    UserModel.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log("Delete Error", err);
        }
        else {
            console.log("User deleted!");
            res.redirect("/admin/users");
        }
    });
}

function update(req, res, next) {
    UserModel.update({_id: req.params.id}, {$set: {
        name : req.body.name,
        email :  req.body.email,
        bio : req.body.bio,
        role : req.body.role
    }}, function(err) {
        if(err) {
            console.log("Update Error:", err);
        }
        else {
            console.log("Update");
            res.redirect("/admin/users");
        }
    });
}


exports.index = index;
// exports.create = create;
exports.show = show;
exports.edit = edit;
exports.destroy = destroy;
exports.update = update;
