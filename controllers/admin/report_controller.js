/**
 * Created by devios on 9/02/17.
 */
var ProjectModel = require('../../models/project');
var UserModel = require('../../models/user');
var TimeRecordModel = require('../../models/time_record');
var ClientModel = require('../../models/client');

function index(req, res, next) {
    var dataTimeRecord;
    var dataProjects;
    var dataUsers;
    var dataClient;

    TimeRecordModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, time_record) {
            if (err) {
                return next(err);
            }
            dataTimeRecord = time_record;
            if (dataProjects != null && dataUsers != null && dataClient != null) {
                res.render("admin/dashboard/index", {
                    time_record: time_record,
                    projects: dataProjects,
                    users: dataUsers,
                    clients: dataClient
                });
            }

        });

    ProjectModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, projects) {
            if (err) {
                return next(err);
            }
            dataProjects = projects;
            if (dataTimeRecord != null && dataUsers != null && dataClient != null) {
                res.render("admin/dashboard/index", {
                    time_record: dataTimeRecord,
                    projects: projects,
                    users: dataUsers,
                    clients: dataClient
                });
            }
        });

    UserModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, users) {
            if (err) {
                return next(err);
            }
            dataUsers = users;
            if (dataTimeRecord != null && dataProjects != null && dataClient != null) {
                res.render("admin/dashboard/index", {
                    time_record: dataTimeRecord,
                    projects: dataProjects,
                    users: users,
                    clients: dataClient
                });
            }
        });
    ClientModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, clients) {
            if (err) {
                return next(err);
            }
            dataClient = clients;
            if (dataTimeRecord != null && dataProjects != null && dataUsers != null) {
                res.render("admin/dashboard/index", {
                    time_record: dataTimeRecord,
                    projects: dataProjects,
                    users: dataUsers,
                    clients: dataClient
                });
            }
        });
}

function create_report_project(req, res) {

    ProjectModel.findOne({_id: req.body.project}, function (err, project) {
        if (req.body.user != 'all') {
            UserModel.findOne({_id: req.body.user}, function (err, user) {
                console.log(req.body.start_date);
                if(req.body.start_date == null){
                    TimeRecordModel.find()
                        .sort({createdAt: "descending"})
                        .exec(function (err, time_record) {
                            res.render("admin/dashboard/_report_project", {
                                project: project,
                                user: user,
                                time_record: time_record
                            });
                        });
                }else{
                    TimeRecordModel.find({"date": {"$gt": req.body.start_date, "$lt": req.body.end_date}},
                        function (err, time_record) {
                            res.render("admin/dashboard/_report_project", {
                                project: project,
                                user: user,
                                time_record: time_record
                            });
                        });
                }

            });
        } else {
            UserModel.find()
                .sort({createdAt: "descending"})
                .exec(function (err, user) {
                    TimeRecordModel.find()
                        .sort({createdAt: "descending"})
                        .exec(function (err, time_record) {
                            res.render("admin/dashboard/_report_project", {
                                project: project,
                                user: user,
                                time_record: time_record
                            });
                        });
                });
        }

    });

}

function create_report_activity(req, res) {
    ProjectModel.findOne({_id: req.body.project}, function (err, project) {
        console.log(req.body.user);
        if (req.body.user != 'all' && req.body.project != 'all') {
            UserModel.findOne({_id: req.body.user}, function (err, user) {
                console.log("Show");
                TimeRecordModel.find()
                    .sort({createdAt: "descending"})
                    .exec(function (err, time_record) {
                        res.render("admin/dashboard/_report_activity", {
                            project: project,
                            user: user,
                            time_record: time_record
                        });
                    });
            });
        } else {
            UserModel.find()
                .sort({createdAt: "descending"})
                .exec(function (err, user) {
                    ClientModel.find()
                        .sort({createdAt: "descending"})
                        .exec(function (err, client) {
                            TimeRecordModel.find()
                                .sort({createdAt: "descending"})
                                .exec(function (err, time_record) {
                                    res.render("admin/dashboard/_report_activity", {
                                        project: project,
                                        user: user,
                                        time_record: time_record,
                                        client: client
                                    });
                                });
                        });
                });
        }
    });
}
function create_report_user(req, res) {
    if (req.body.user == 'all') {
        UserModel.find()
            .sort({createdAt: "descending"})
            .exec(function (err, user) {
                TimeRecordModel.find()
                    .sort({createdAt: "descending"})
                    .exec(function (err, time_record) {
                        ProjectModel.find()
                            .sort({createdAt: "descending"})
                            .exec(function (err, project) {
                                res.render("admin/dashboard/_report_user", {
                                    project: project,
                                    user: user,
                                    time_record: time_record
                                });
                            });
                    });
            });
    } else {
        UserModel.findOne({_id: req.body.user}, function (err, user) {
            console.log("Show");
            TimeRecordModel.find()
                .sort({createdAt: "descending"})
                .exec(function (err, time_record) {
                    ProjectModel.find()
                        .sort({createdAt: "descending"})
                        .exec(function (err, project) {
                            res.render("admin/dashboard/_report_user", {
                                project: project,
                                user: user,
                                time_record: time_record
                            });
                        });
                });
        });
    }
}
exports.index = index;
exports.create_report_project = create_report_project;
exports.create_report_activity = create_report_activity;
exports.create_report_user = create_report_user;