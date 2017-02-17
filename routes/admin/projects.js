module.exports  = function (router) {
    var projectController = require('../../controllers/admin/projects_controller');
    var sessions_helper = require('../../helpers/sessions_helper');
    var time_record_controller = require('../../controllers/time_record_controller');
    router.all("/projects/", sessions_helper.ensureAuthenticated);
    router.get("/projects/", projectController.index);
    router.post("/projects/", projectController.create);
    router.get("/projects/:id", projectController.show);
    router.get("/projects/:id/edit", projectController.edit);
    router.put("/projects/:id", projectController.update);
    router.get("/projects/:id/time_record", time_record_controller.edit);
};

