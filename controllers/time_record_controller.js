/**
 * Created by devios on 22/01/17.
 */

var ProjectModel = require('../models/project');
var TimeRecordModel = require('../models/time_record');

function time_record_new (req, res, next){
    var dataTimeRecord;
    var dataProjects;
    ProjectModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, projects) {
            if(err){
                return next(err);
            }
            dataProjects = projects;
            if (dataTimeRecord != null){
                res.render("time_record/index", {projects : projects, times_records : dataTimeRecord});
            }
        });

    TimeRecordModel.find()
        .sort({createdAt: "descending"})
        .exec(function (err, times_records) {
            if(err){
                return next(err);
            }
            dataTimeRecord = times_records;
            if (dataTimeRecord != null){
                res.render("time_record/index", {projects : dataProjects, times_record : dataTimeRecord});
            }
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
    ProjectModel.findOne({_id: req.params.id}, function(err, project) {
        console.log("Edit time ");
        res.render("time_record/index", {project: project});
    });
}
exports.time_record_new = time_record_new;
exports.create = create;
exports.edit = edit;
