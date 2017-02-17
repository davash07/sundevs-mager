/**
 * Created by devios on 7/02/17.
 */

var ProjectModel = require('../models/project');
var TimeRecordModel = require('../models/time_record');

function index (req, res, next){
    var dataTimeRecord;
    var dataProjects;

    TimeRecordModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, time_record) {
            if(err){
                return next(err);
            }
            dataTimeRecord = time_record;
            if (dataProjects != null){
                res.render("dashboard/index", {time_record : time_record, projects : dataProjects});
            }

        });

    ProjectModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, projects) {
            if(err){
                return next(err);
            }
            dataProjects = projects;
            if (dataTimeRecord != null){
                res.render("dashboard/index", {time_record : dataTimeRecord, projects : dataProjects});
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