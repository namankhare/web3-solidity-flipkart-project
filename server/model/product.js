import mongoose from "mongoose";    
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    currentPrice:{
        type: Number,
        required: true
    },
    SKU:{
        type: Number,
        required: true
    },
    description:{
        type: String
    }
}, {timestamps: true});

export default mongoose.model('Product', productSchema);