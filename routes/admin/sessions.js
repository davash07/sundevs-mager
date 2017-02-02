module.exports  = function (router, passport) {
    var session_Controller = require('../../controllers/sessions_controller');
    var passport = require("passport");
    var sessions_Helper = require('../../config/setuppassport');
    router.use(function(req, res, next) {
        res.locals.currentUser = req.user;
        res.locals.errors = req.flash("error");
        res.locals.infos = req.flash("info");
        next();
    });
    router.route('/').get(session_Controller.login);

    router.route('/login').get(session_Controller.login);

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	router.route('/logout').delete(session_Controller.destroy);

    router.post("/login", passport.authenticate("login", {
        successRedirect: "/admin/projects",
        failureRedirect: "/",
        failureFlash: true
    }));
    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('admin/user/register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/admin/create_user', passport.authenticate('signup', {
        successRedirect: "/admin/users",
        failureRedirect: "/admin/users",
        failureFlash : true
    }));
};