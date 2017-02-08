/**
 * Created by devios on 7/02/17.
 */
module.exports  = function (router) {
    var dashboardController = require('../controllers/dashboard_controller');
    var sessions_helper = require('../helpers/sessions_helper');
    router.all("/dashboard", sessions_helper.ensureAuthenticated);
    router.get("/dashboard/", dashboardController.index);
    router.get("/dashboard/:id", dashboardController.show);

};