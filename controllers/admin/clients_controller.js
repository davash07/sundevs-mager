/**
 * Created by devios on 19/01/17.
 */
var ClientModel = require('../../models/client');

function index (req, res) {
    ClientModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, clients) {
            if(err){
                return next(err);
            }
            res.render("admin/client/index", {clients : clients});
        });
}

function create(req, res) {
    console.log('POST - /client');
    var client = new ClientModel();
    client.company_name = req.body.company_name;
    client.contact_name = req.body.contact_name;
    client.phone_number = req.body.phone_number;
    client.email = req.body.email;
    client.website = req.body.website;
    client.status = req.body.status;
    client.save(function(err) {
        if(!err) {
            return res.redirect("/admin/clients");
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
    ClientModel.findOne({_id: req.params.id}, function(err, client) {
        res.render("admin/client/edit", {client: client});
    });
}
function update(req, res, next) {
    ClientModel.update({_id: req.params.id}, {$set: {
        company_name :req.body.company_name,
        contact_name : req.body.contact_name,
        phone_number : req.body.phone_number,
        email : req.body.email,
        website : req.body.website,
        status : req.body.status
    } }, function(err) {
        if(err) {
            console.log("Update Error:", err);
        }
        else {
            res.redirect("/admin/clients");
        }

    });
}

exports.index = index;
exports.create = create;
exports.show = show;
exports.edit = edit;
exports.update = update;
