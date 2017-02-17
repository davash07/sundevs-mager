/**
 * Created by devios on 14/02/17.
 */
var BrandModel = require('../../models/brand');

function index (req, res) {
    BrandModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, brands) {
            if(err){
                return next(err);
            }
            res.render("admin/assets/index", {brands : brands});
        });
}

function create(req, res) {
    console.log('POST - /Brand');
    var brand = new BrandModel();
    brand.brand = req.body.brand;
    brand.type = req.body.type;
    brand.save(function(err) {
        if(!err) {
            return res.redirect("/admin/assets");
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
}

function show(req, res, next) {

}

function edit(req, res) {
    BrandModel.findOne({_id: req.params.id}, function(err, brand) {
        console.log("Edit / asset");
        res.render("admin/assets/", {brands: brands});
    });
}
function update(req, res, next) {
    BrandModel.update({_id: req.params.id}, {$set: {
        brand :req.body.brand,
        type : req.body.type
    } }, function(err) {
        if(err) {
            console.log("Update Error:", err);
        }
        else {
            res.redirect("/admin/assets/");
        }

    });
}

exports.index = index;
exports.create = create;
exports.show = show;
exports.edit = edit;
exports.update = update;
