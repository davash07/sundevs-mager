module.exports  = function (router) {
    var projectController = require('../controllers/projects_controller');
    var time_record_controller = require('../controllers/time_record_controller');
    var sessions_helper = require('../helpers/sessions_helper');
    router.all("/projects", sessions_helper.ensureAuthenticated);
    router.get("/projects/", projectController.index);
    router.get("/projects/:id", projectController.show);
    router.get("/projects/:id/time_record", time_record_controller.edit);
    router.get("/projects/:id/time_record", time_record_controller.time_record_new);

};

