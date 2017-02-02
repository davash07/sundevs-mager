/**
 * Created by devios on 23/01/17.
 */
module.exports  = function (router) {
    var userController = require('../../controllers/admin/users_controller');
    var sessions_helper = require('../../helpers/sessions_helper');
    var passport = require("passport");

    router.all("/users/", sessions_helper.ensureAuthenticated);
    router.get("/users", userController.index);
    // router.post("/users", userController.create);
    router.get('/users/:id/destroy', userController.destroy);
    router.get("/users/:id/edit", userController.edit);
    router.put("/users/:id", userController.update);
    router.get("/users/:id", userController.show);

    router.post('/admin/create_user', passport.authenticate('signup', {
        successRedirect: "/admin/users",
        failureRedirect: "/admin/users",
        failureFlash : true
    }));
};
