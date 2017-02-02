/**
 * Created by devios on 19/01/17.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    resource:{
        type: String,
        required: true
    },
    permissions:{
        type:[String],
        required: true
    }
});

var Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;