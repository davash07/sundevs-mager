/**
 * Created by devios on 9/02/17.
 */
module.exports  = function (router) {
    var reportController = require('../../controllers/admin/report_controller');
    var sessions_helper = require('../../helpers/sessions_helper');
    router.all("/report", sessions_helper.ensureAuthenticated);
    router.get("/report/", reportController.index);
    router.post("/report_project/", reportController.create_report_project);
    router.post("/report_activity/", reportController.create_report_activity);
    router.post("/report_user/", reportController.create_report_user);

};