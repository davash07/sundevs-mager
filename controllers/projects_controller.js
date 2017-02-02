/**
 * Created by devios on 19/01/17.
 */
var ProjectModel = require('../models/project');
var ClientModel = require('../models/client');

function index (req, res, next){
    var dataClients;
    var dataProjects;

    ClientModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, clients) {
            if(err){
                return next(err);
            }
            dataClients = clients;
            if (dataProjects != null){
                res.render("project/index", {clients : clients, projects : dataProjects});
            }

        });

    ProjectModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, projects) {
            if(err){
                return next(err);
            }
            dataProjects = projects;
            if (dataClients != null){
                res.render("project/index", {clients : dataClients, projects : dataProjects});
            }
        });
}

function show(req, res) {
    ProjectModel.findOne({_id: req.params.id}, function(err, project) {
        console.log("Show");
        res.render("project/show", {project: project});
    });
}
exports.index = index;
exports.show = show;