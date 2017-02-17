/**
 * Created by devios on 19/01/17.
 */
var ProjectModel = require('../models/project');
var ClientModel = require('../models/client');
var UserModel = require('../models/user');
function index(req, res, next) {
    ClientModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, clients) {
            if (err) {
                return next(err);
            }
            ProjectModel.find()
                .sort({createdAt: "descending"})
                .exec(function (err, projects) {
                    if (err) {
                        return next(err);
                    }
                    res.render("project/index", {clients: clients, projects: projects});
                });
        });

}

function show(req, res) {
    ProjectModel.findOne({_id: req.params.id}, function (err, project) {
        UserModel.find()
            .sort({createdAt: "descending"})
            .exec(function (err, users) {
                if (err) {
                    return next(err);
                }
                res.render("project/show", {project: project, users: users});
            });
        console.log("Show");
    });
}
exports.index = index;
exports.show = show;