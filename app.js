//require all the libraries
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var logger = require("morgan");
var setUpPassport = require("./config/setuppassport");
var methodOverride = require('method-override');
var configDB = require('./config/db.js');
mongoose.connect(configDB.url);

var router_admin = express.Router();
var router = express.Router();
//require all the app's routes
require("./routes/admin/sessions.js")(router, passport);
var routes_users = require("./routes/users");
require("./routes/admin/users")(router_admin);
require("./routes/admin/projects")(router_admin);
require("./routes/admin/clients.js")(router_admin);
require("./routes/times_records")(router);
require("./routes/projects")(router);
require("./routes/dashboard")(router);
require('./config/setuppassport')(passport);

var app = express();

app.set("port", process.env.PORT || 3000);
setUpPassport();
app.use(logger("dev"));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));

router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));
app.use(cookieParser());

app.use(session({
	secret: "TKRv0IJs=HYqrvagQ#X!F!%V]Ww/4KiVs$s,<<MX",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router);
app.use('/admin',router_admin);



// Error handling middleware
app.use(function(err, req, res, next) {
	console.error(err);
	next(err);
});

app.use(function(err, req, res, next) {
    if(err.name == 'ValidationError') {
        res.statusCode = 400;
        res.send({ error: 'Validation error' });
    } else {
        res.statusCode = 500;
        res.send({ error: 'Server error' });
    }
    console.log('Internal error(%d): %s', res.statusCode,err.message);

});

app.listen(app.get("port"), function() {
	console.log("Server started on port " + app.get("port"));
});