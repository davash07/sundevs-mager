/**
 * Created by devios on 13/02/17.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assetSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    brand: {
        type: String,
        required : true
    },
    type: {
        type: String,
        required : true
    },
    model: {
        type: String
    },
    description: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    serial_number: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Asset', assetSchema);
