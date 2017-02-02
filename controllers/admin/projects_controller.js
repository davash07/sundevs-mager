/**
 * Created by devios on 19/01/17.
 */
var ProjectModel = require('../../models/project');
var ClientModel = require('../../models/client');
var UserModel = require('../../models/user');

function index (req, res, next){
    var dataClients;
    var dataProjects;
    var dataUsers;
    ClientModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, clients) {
            if(err){
                return next(err);
            }
            dataClients = clients;
            if (dataProjects != null && dataUsers != null){
                res.render("admin/project/index", {clients : clients, projects : dataProjects, users : dataUsers});
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
                res.render("admin/project/index", {clients : dataClients, projects : dataProjects, users : dataUsers});
            }
        });

    UserModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, users) {
            if(err){
                return next(err);
            }
            dataUsers = users;
            if (dataProjects != null){
                res.render("admin/project/index", {clients : dataClients, projects : dataProjects, users : dataUsers});
            }
        });
}

function create(req, res, next) {
    console.log('POST - /project');
    var project = new ProjectModel();
    project.name = req.body.name;
    project.client_id =  req.body.client_id;
    project.activities = req.body.activities;
    project.estimated_hours = req.body.estimated_hours;
    project.start_date = req.body.start_date;
    project.estimated_end_date = req.body.estimated_end_date;
    project.real_end_date = req.body.real_end_date;
    project.trello_board_id = req.body.trello_board_id;
    project.challenging_date = req.body.challenging_date;
    project.challenging_bugs = req.body.challenging_bugs;
    project.status = req.body.status;
    project.image = req.body.image;
    ClientModel.findById(req.body.client_id, function(err, client) {
        if(err){
           console.log(err);
        } else{
            project.client_id = client;

        }
    });
    project.save(function(err) {
        if(!err) {
            console.log(req.body);
            console.log(req.param);
            console.log("Project created");
            ClientModel.findOne({ _id: project.client_id }, function (err, doc){
                doc.projects.push({project_id: project._id, name: project.name});
                doc.save();
            });
            return res.redirect("/admin/projects");
        } else {
            next(err)
        }
    });
}

function show(req, res) {

}

function edit(req, res) {
    var dataProjects;
    var dataUsers;

    UserModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, users) {
            if(err){
                return next(err);
            }
            dataUsers = users;
            if (dataProjects != null){
                res.render("admin/project/edit", { user : users, project : dataProjects});
            }
        });

    ProjectModel.findOne({_id: req.params.id}, function(err, project) {
        if(err){
            return next(err);
        }
        dataProjects = project;
        if (dataUsers != null){
            res.render("admin/project/edit", {project : dataProjects, user : dataUsers});
        }

        // res.render("admin/project/edit", {project: project, user: dataUsers});
    });
}

function update(req, res, next) {
    ProjectModel.update({_id: req.params.id}, {$set: {
        name: req.body.name,
        client_id: req.body.client_id,
        activities: req.body.activities,
        estimated_hours: req.body.estimated_hours,
        start_date: req.body.start_date,
        estimated_end_date: req.body.estimated_end_date,
        real_end_date: req.body.real_end_date,
        trello_board_id: req.body.trello_board_id,
        challenging_date: req.body.challenging_date,
        challenging_bugs: req.body.challenging_bugs,
        status: req.body.status,
        users_id: req.body.users_id,
        image: req.body.image
    }}, function(err) {
        if(err) {
            console.log("Update Error:", err);
        }
        else {
            if(req.body.users_id.length == 24){
                UserModel.findOne({ _id: req.body.users_id }, function (err, doc){
                    doc.projects_ids.push({project_id: req.params.id});
                    doc.save();
                });
                console.log("Update projects");
                res.redirect("/admin/projects");
            } else{
                console.log(req.body.users_id.length);
                for(var i = 0; i < req.body.users_id.length; i++) {
                    UserModel.findOne({ _id: req.body.users_id[i] }, function (err, doc){
                        doc.projects_ids.push({project_id: req.params.id});
                        doc.save();
                    });
                }
                console.log("Update projects");
                res.redirect("/admin/projects");
            }

        }

    });
}
function destroy(req, res) {
    ProjectModel.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log("Delete Error", err);
        }
        else {
            console.log("Project deleted!");
            res.redirect("/admin/projects");
        }
    });
}

exports.index = index;
exports.create = create;
exports.show = show;
exports.edit = edit;
exports.destroy = destroy;
exports.update = update;