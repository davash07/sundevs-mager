module.exports  = function (router) {
    var userController = require('../controllers/users_controller');
    var okrController = require('../controllers/okr_controller');
    var sessions_helper = require('../helpers/sessions_helper');
    router.all("/profile", sessions_helper.ensureAuthenticated);
    router.get("/profile/:id", userController.show);
    router.get("/profile/:id/", userController.edit);
    router.get("/profile/:id/", userController.update);
    router.get("/profile/", okrController.index);
    router.post("/profile_okr/", okrController.create);
    router.get("/profile_okr/:id/destroy", okrController.destroy);
    router.get("/profile_okr/:id/edit", okrController.edit);
    router.put("/profile_okr/:id", okrController.update);
    router.get("/profile_okr/:id", okrController.show);

};

