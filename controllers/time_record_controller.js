/**
 * Created by devios on 22/01/17.
 */

var ProjectModel = require('../models/project');
var TimeRecordModel = require('../models/time_record');

function time_record_new (req, res) {
    console.log("entro");
    TimeRecordModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, time) {
            if(err){
                return next(err);
            }
            res.render("time_record/index", {time : time});
        });
}

function create(req, res, next) {
    console.log('POST - /Time Record');
    var timeRecord = new TimeRecordModel();
    timeRecord.project_id = req.body.project_id;
    timeRecord.user_id = req.user._id;
    timeRecord.activity = req.body.activity;
    timeRecord.date = req.body.date;
    timeRecord.hours = req.body.hours;
    timeRecord.minutes = req.body.minutes;
    timeRecord.comment = req.body.comment;
    timeRecord.save(function(err) {
        if(!err) {
            console.log(req.body);
            console.log("Record Time created");
            ProjectModel.findOne({ _id: timeRecord.project_id }, function (err, doc){
                doc.time_records.push({time_record_id: timeRecord._id});
                doc.save();
            });
            return res.redirect('/admin/projects');
        } else {
            next(err);
        }
    });
}
function edit(req, res) {
    var dataProjects;
    var dataTimeRecord;

    TimeRecordModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, time_records) {
            if(err){
                return next(err);
            }
            dataTimeRecord = time_records;
            if (dataProjects != null){
                res.render("time_record/index", { time_record : time_records, project : dataProjects});
            }
        });

    ProjectModel.findOne({_id: req.params.id}, function(err, project) {
        if(err){
            return next(err);
        }
        dataProjects = project;
        if (dataTimeRecord != null){
            res.render("time_record/index", {project : dataProjects, time_record : dataTimeRecord});
        }

        // res.render("admin/project/edit", {project: project, user: dataUsers});
    });
}
//
//
// function edit(req, res) {
//     console.log("time");
//     ProjectModel.findOne({_id: req.params.id}, function(err, project) {
//         console.log("Edit time ");
//
//         res.render("time_record/index", {project: project});
//     });
// }

function show(req, res) {
    TimeRecordModel.findOne({_id: req.params.id}, function(err, timeRecord) {
        console.log("Show");
        res.render("Time_Record/show", {timeRecord: timeRecord});
    });
}

exports.time_record_new = time_record_new;
exports.show = show;
exports.create = create;
exports.edit = edit;
