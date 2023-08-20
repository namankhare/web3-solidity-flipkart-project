const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partnerProductSchema = new Schema({
    partner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productImage: {
        type: String,
        default: "../assets/images/itemNotFound.png"
    },
    reward_name: {
        type: String,
        required: true
    },
    discount_percentage: {
        type: Number,
        required: true
    },
    loyalty_coins_required: {
        type: Number,
        required: true
    },
    details: {
        valid_until: Date,
        applicable_on: String,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('PartnerProduct', partnerProductSchema);