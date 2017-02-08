
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user");

module.exports = function(passport) {
    var passport = require("passport");
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            console.log("error");
            process.nextTick(function() {
                User.findOne({ 'email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false);
                    } else {
                        var newUser  = new User();
                        newUser.name = req.body.name;
                        newUser.bio = req.body.bio;
                        newUser.rol = req.body.rol;
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null);
                        });
                    }
                });

            });

        }));
    passport.use('login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            User.findOne({ 'email' :  email }, function(err, user) {
                console.log("entro a la funcion !");

                if (err)
                    return done(err);

                if (!user)
                    return done(null, false);

                if (!user.validPassword(password))
                    return done(null, false);

                return done(null, user);
            });

        }));

};