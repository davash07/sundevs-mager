/**
 * Created by devios on 22/01/17.
 */
function ensureAuthenticated(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log("autentico");
        next();
    } else {
        res.redirect("/login");
    }

}
function validateRolUser(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("autentico");
        next();
    } else {
        res.redirect("/login");
    }


}
exports.ensureAuthenticated = ensureAuthenticated;
exports.validateRolUser = validateRolUser;