const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userWallet: {
        unique: true,
        type: String
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        // required: true
    },
    pincode: {
        type: Number,
        // required: true
    },
    state: {
        type: String,
        // required: true,
    },
    points: {
        type: Number,
        default: 0
    },
    OrderHistory: [[
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
            pointsEarned: Number,
            pointsRedeemed: Number,
            price: Number,
            paymentMethod: String,
            dateOfOrder: Date,
            productName: String,
            uuid: String
        }
    ]],
    ClaimedCoupon: [
        {
            rewardsCouponId: {
                type: Schema.Types.ObjectId,
                ref: 'PartnerProduct'
            },
            reward_name: String,
            validUntil: Date,
            applicableOn: String,
            couponCode: String,
            description: String,
            loyaltyCoinsUsed: Number
        }
    ],
    SoldItemsHistory: [[
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
            pointsDiscounted: Number,
            price: Number,
            paymentMethod: String,
            dateOfOrder: Date
        }
    ]],

    role: {
        type: Number,
        default: 0
    },
    referredUsers: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        pointsEarned: Number,
        dateOfReferral: Date
    }],
    referredBy: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
