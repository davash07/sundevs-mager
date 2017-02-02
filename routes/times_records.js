/**
 * Created by devios on 22/01/17.
 */
module.exports  = function (router) {
    var registerTimeController = require('../controllers/time_record_controller');
    var sessions_helper = require('../helpers/sessions_helper');

    router.all("/time_record/", sessions_helper.ensureAuthenticated);
    router.get("/time_record", registerTimeController.time_record_new);
    router.post("/time_record", registerTimeController.create);

};

