/**
 * Created by devios on 7/02/17.
 */
module.exports  = function (router) {
    var dashboardController = require('../../controllers/admin/dashboard_controller');
    var sessions_helper = require('../../helpers/sessions_helper');
    var reportController = require('../../controllers/admin/report_controller');

    router.all("/dashboard", sessions_helper.ensureAuthenticated);
    router.get("/dashboard/", reportController.index);
    router.get("/dashboard/:id", dashboardController.show);

};