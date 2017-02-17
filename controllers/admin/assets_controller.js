/**
 * Created by devios on 16/02/17.
 */
var AssetModel = require('../../models/asset');
var BrandModel = require('../../models/brand');

function index(req, res) {
    AssetModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, assets) {
            if (err) {
                return next(err);
            }
            BrandModel.find()
                .sort({createdAt: "descending"})
                .exec(function (err, brands) {
                    if (err) {
                        return next(err);
                    }
                    res.render("admin/assets/index", {assets: assets, brands: brands});
                });
        });
}

function create(req, res) {
    console.log('POST - /Assets');
    var asset = new AssetModel();
    asset.brand = req.body.brand;
    asset.type = req.body.type;
    asset.model = req.body.model;
    asset.description = req.body.description;
    asset.state = req.body.state;
    asset.serial_number = req.body.serial_number;
    asset.price = req.body.price;
    asset.save(function (err) {
        if (!err) {
            return res.redirect("/admin/assets");
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({error: 'Validation error'});
            } else {
                res.statusCode = 500;
                res.send({error: 'Server error'});
            }
            console.log('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
}

function show(req, res, next) {
    AssetModel.findOne({_id: req.params.id}, function(err, assets) {
        BrandModel.find()
            .sort({createdAt: "descending"})
            .exec(function (err, brands) {
                if(err){
                    return next(err);
                }
                res.render("admin/assets/show", {assets: assets, brands : brands});
            });
        console.log("Show");
    });
}

function edit(req, res) {
    AssetModel.findOne({_id: req.params.id}, function(err, assets) {
        BrandModel.find()
            .sort({createdAt: "descending"})
            .exec(function (err, brands) {
                if(err){
                    return next(err);
                }
                res.render("admin/assets/edit", {assets: assets, brands : brands});
            });
        console.log("Show");
    });
}
function update(req, res, next) {
    AssetModel.update({_id: req.params.id}, {
        $set: {
            brand: req.body.brand,
            type: req.body.type,
            model: req.body.model,
            description: req.body.description,
            state: req.body.state,
            serial_number: req.body.serial_number,
            price: req.body.price
        }
    }, function (err) {
        if (err) {
            console.log("Update Error:", err);
        }
        else {
            res.redirect("/admin/assets");
        }

    });
}

function destroy(req, res) {

    AssetModel.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log("Delete Error", err);
        }
        else {
            console.log("Item deleted!");
            res.redirect("/admin/assets");
        }
    });
}

exports.destroy = destroy;
exports.index = index;
exports.create = create;
exports.show = show;
exports.edit = edit;
exports.update = update;
