module.exports  = function (router) {
    var clientController = require('../../controllers/admin/clients_controller');
    var sessions_helper = require('../../helpers/sessions_helper');

    router.all("/clients/", sessions_helper.ensureAuthenticated);
    router.get("/clients", clientController.index);
    router.post("/clients", clientController.create);
    router.get("/clients/:id/edit", clientController.edit);
    router.put("/clients/:id", clientController.update);
    router.get("/clients/:id", clientController.show);

};
