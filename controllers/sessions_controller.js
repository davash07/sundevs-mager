/**
 * Created by devios on 19/01/17.
 */
var passport = require("passport");

function login(req, res) {
    res.render("sessions/login");
}

function create() {
    passport.authenticate("login", {
        successRedirect: "/admin/projects",
        failureRedirect: "/login",
        failureFlash: true
    });

}
function destroy(req, res) {
    req.logout();
    res.redirect('/login');
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log("You must be logged in to see this page.");
        res.redirect("/login");
    }

}
exports.login = login;
exports.create = create;
exports.destroy = destroy;
exports.ensureAuthenticated = ensureAuthenticated;