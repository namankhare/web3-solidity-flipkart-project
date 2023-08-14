import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address: {
        type: String,
        // required: true
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
    points:{
        type: Number,
        default: 0
    },
    OrderHistory: [[
        {
            productId:{
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
            pointsEarned: Number,
            pointsRedeemed: Number,
            price: Number,
            paymentMethod: String,
            dateOfOrder: Date
        }
    ]]
}, {timestamps: true});

export default mongoose.model('User', userSchema);