/**
 * Created by devios on 14/02/17.
 */
module.exports  = function (router) {
    var brandController = require('../../controllers/admin/brands_controller');
    var sessions_helper = require('../../helpers/sessions_helper');
    var assetController = require('../../controllers/admin/assets_controller');
    router.all("/assets/", sessions_helper.ensureAuthenticated);
    router.get("/assets", assetController.index);
    router.post("/assets_brand", brandController.create);
    router.get("/assets/:id/edit", assetController.edit);
    router.put("/assets/:id", assetController.update);
    router.get("/assets/:id", brandController.show);

    router.post("/assets", assetController.create);
    router.get("/assets/:id/destroy", assetController.destroy);

};