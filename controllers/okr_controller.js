/**
 * Created by devios on 17/02/17.
 */
/**
 * Created by devios on 22/01/17.
 */

var OkrModel = require('../models/okr');

function index (req, res) {
    console.log("entro");
    OkrModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, okr) {
            if(err){
                return next(err);
            }
            res.render("profile/index", {okr : okr});
        });
}

function create(req, res, next) {
    console.log('POST - /Okr');
    var okr = new OkrModel();
    okr.objective = req.body.objective;
    okr.user_id = req.user._id;
    okr.result = req.body.result;
    okr.save(function(err) {
        if(!err) {
            console.log(req.body);
            console.log("OKR created");
            return res.redirect('/profile');
        } else {
            next(err);
        }
    });
}
function edit(req, res) {

    OkrModel.findOne({_id: req.params.id}, function(err, okr) {
        if(err){
            return next(err);
        }
            res.render("profile/edit", {okr : okr});
    });
}

function show(req, res) {
    OkrModel.findOne({_id: req.params.id}, function(err, okr) {
        if(err){
            return next(err);
        }
        res.render("profile/edit", {okr : okr});
    });
}

function destroy(req, res) {

    OkrModel.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log("Delete Error", err);
        }
        else {
            console.log("Okr deleted!");
            res.redirect("/profile");
        }
    });
}
function update(req, res, next) {
    OkrModel.update({_id: req.params.id}, {$set: {
        objective :req.body.objective,
        result : req.body.result
    } }, function(err) {
        if(err) {
            console.log("Update Error:", err);
        }
        else {
            res.redirect("/profile");
        }

    });
}

exports.index = index;
exports.show = show;
exports.create = create;
exports.edit = edit;
exports.destroy = destroy;
exports.update = update;
