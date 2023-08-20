const PartnerProduct = require("../model/partnerProduct.js");
const User = require("../model/user.js");
const { uniqueSuffix } = require("../helper/multer.js");
const fs = require('fs');



const getAllPartnerItems = async (req, res, next) => {
    try {
        const partnerProduct = await PartnerProduct.find({});
        console.log(partnerProduct)
        res.status(200).json({ data: partnerProduct, message: "Fetched successfully", status: "success" });

    } catch (error) {
        res.status(500).json({ message: error.messagemessage, status: "error" });
    }
}
const getPartnerItems = async (req, res, next) => {
    try {
        const partnerProduct = await PartnerProduct.find({ partner: req.auth._id });
        console.log(partnerProduct)
        res.status(200).json({ data: partnerProduct, message: "Fetched successfully", status: "success" });

    } catch (error) {
        res.status(500).json({ message: error.messagemessage, status: "error" });
    }
}

const launchCard = async (req, res, next) => {
    const { reward_name, discount_percentage, details, description, loyalty_coins_required } = req.body;
    if (!(reward_name && discount_percentage && details && description && loyalty_coins_required)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    console.log(req.body)
    try {
        const existingProduct = await PartnerProduct.find({ reward_name, partner: req.auth._id });
        if (existingProduct.length > 0) {
            return res.status(400).json({ message: "Copoun already exists" });
        }

        const product = await PartnerProduct.create({
            reward_name,
            discount_percentage,
            details,
            description,
            loyalty_coins_required,
            partner: req.auth._id,

        });

        res.status(201).json({ message: "Product launched successfully", product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCard = async (req, res, next) => {
    const itemId = req.params.id;

    const item = await PartnerProduct.findById(itemId);

    if (!item) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (item.partner.toString() !== req.auth._id.toString()) {
        return res.status(401).json({ message: "You are not authorized to update this copoun" });
    }
    try {

        const { reward_name, discount_percentage, details, description, loyalty_coins_required } = req.body;

        let updateData = {
            reward_name,
            discount_percentage,
            details,
            description,
            loyalty_coins_required,
        }
        const product = await PartnerProduct.findByIdAndUpdate({ _id: itemId }, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCard = async (req, res, next) => {
    const itemId = req.params.id;
    const item = await PartnerProduct.findById(itemId);

    if (!item) {
        return res.status(404).json({ message: "Copoun not found" });
    }

    if (item.partner.toString() !== req.auth._id.toString()) {
        return res.status(401).json({ message: "You are not authorized to delete this copoun" });
    }

    try {
        const product = await PartnerProduct.findByIdAndDelete(itemId);

        res.status(200).json({ message: "Item successfully deleted", product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllPartnerItems, launchCard, updateCard, deleteCard, getPartnerItems };

