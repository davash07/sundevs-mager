/**
 * Created by devios on 17/02/17.
 */
module.exports  = function (router) {
    var coworkerController = require('../controllers/coworker_controller');
    var sessions_helper = require('../helpers/sessions_helper');
    router.all("/coworker", sessions_helper.ensureAuthenticated);
    router.get("/coworker/", coworkerController.index);
    router.get("/coworker/:id", coworkerController.show);

};