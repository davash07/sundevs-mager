/**
 * Created by devios on 17/02/17.
 */

var UserModel = require('../models/user');
var OkrModel = require('../models/okr');

function index(req, res, next) {
    UserModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, users) {
            if (err) {
                return next(err);
            }
            // OkrModel.find()
            //     .sort({createdAt: "descending"})
            //     .exec(function (err, okrs) {
            //         if (err) {
            //             return next(err);
            //         }
            res.render("coworker/index", {users: users});
                // });
        });
}

function show(req, res) {
    UserModel.findOne({_id: req.params.id}, function (err, user) {
        console.log("Show");
        OkrModel.findOne({user_id : req.params.id}, function (err, okrs) {
            res.render("coworker/show", {user: user, okrs: okrs});

        // })
            // .sort({createdAt: "descending"})
            // .exec(function (err, okrs) {
            //     if (err) {
            //         return next(err);
            //     }
            //     res.render("coworker/show", {user: user, okrs: okrs});
            });
    });
}
exports.index = index;
exports.show = show;