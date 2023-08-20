import PartnerProduct from "../model/partnerProduct.js";
import User from "../model/user.js";
import { uniqueSuffix } from "../helper/multer.js"
import fs from 'fs'


const getAllPartnerItems = async (req, res, next) => {
    try {
        const partnerProduct = await PartnerProduct.find({ partner: req.auth._id });
        console.log(partnerProduct)
        res.status(200).json({ data: partnerProduct, message: "Fetched successfully", status: "success" });

    } catch (error) {
        res.status(500).json({ message: error.messagemessage, status: "error" });
    }
}

export { getAllPartnerItems };

