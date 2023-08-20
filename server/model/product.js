const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productImage: {
        type: String,
        default: "../assets/images/itemNotFound.png"
        // required: true
    },
    MRP: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    SKU: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);