const Product = require("../model/product.js");
const User = require("../model/user.js");
const { uniqueSuffix } = require("../helper/multer.js");
const fs = require('fs');

const launchProduct = async (req, res, next) => {
    const { name, MRP, discount, points, SKU, description } = req.body;
    if (!(name && MRP && discount && points && SKU && description)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        let photoName = uniqueSuffix + "/" + req.file.filename;
        const existingProduct = await Product.find({ name, seller: req.auth._id });
        if (existingProduct.length > 0) {
            try {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({ message: "Product already exists" });
            } catch (err) {
                console.error('Error deleting the image:', err);
            }
        }
        const product = await Product.create({
            name,
            MRP,
            discount,
            points,
            SKU,
            description,
            seller: req.auth._id,
            productImage: photoName
        });
        // console.log(product) 
        res.status(201).json({ message: "Product launched successfully", product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllItems = async (req, res, next) => {
    try {
        const products = await Product.find({ seller: req.auth._id });
        res.status(200).json({ products: products });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getItem = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.find({ _id: productId });
        return res.status(200).json({ product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateItem = async (req, res, next) => {
    const productId = req.params.id;

    const item = await Product.findById(productId);

    if (!item) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (item.seller.toString() !== req.auth._id.toString()) {
        return res.status(401).json({ message: "You are not authorized to update this product" });
    }


    try {

        const { name, MRP, discount, points, SKU, description } = req.body;
        console.log(name)

        let updateData = {
            name,
            MRP,
            discount,
            points,
            SKU,
            description,
        }

        if (req.file !== undefined) {
            let photoName = uniqueSuffix + "/" + req.file.filename;
            console.log(photoName);
            updateData.productImage = photoName
        }

        const product = await Product.findByIdAndUpdate({ _id: productId }, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteItem = async (req, res, next) => {
    const productId = req.params.id;
    const item = await Product.findById(productId);

    if (!item) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (item.seller.toString() !== req.auth._id.toString()) {
        return res.status(401).json({ message: "You are not authorized to delete this product" });
    }

    try {
        const product = await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: "Item successfully deleted", product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const afterPaymentSeller = async (req, res, next) => {
    try {

        const { items } = req.body;

        let seller = await Promise.all(items.map(async (item) => {
            const product = await Product.findById(item.id);

            let sku = product.SKU - item.qnt;

            await Product.findByIdAndUpdate(item.id, { SKU: sku }, { new: true });
            return (
                product.seller.toString()
            )
        }));

        // console.log(seller);

        seller = await Promise.all(seller.map(async (id) => {
            const order = await Promise.all(items.map(async (product) => {

                return {
                    productId: product.id,
                    quantity: product.qnt,
                    pointsDiscounted: product.pointsRedeemed,
                    price: product.price,
                    paymentMethod: product.paymentMethod,
                    dateOfOrder: product.dateOfOrder,
                }
            }));
            const currentSeller = await User.findById(id);
            let SoldItemsHistory = currentSeller.SoldItemsHistory;
            SoldItemsHistory.push(order);

            await User.findByIdAndUpdate(id, { SoldItemsHistory: SoldItemsHistory });



        }));
        return res.status(200).json({ message: "Seller updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    launchProduct,
    getAllItems,
    getItem,
    updateItem,
    deleteItem,
    afterPaymentSeller
};