import Product from "../model/product.js";
import User from "../model/user.js";

const launchProduct = async (req, res, next) => {
    const {name, MRP, discount, points, SKU, description} = req.body;

    if(!(name && MRP && discount && points && SKU && description)){
        res.status(400).json({message: "All fields are required"});
    }

    try {

        const existingProduct = await Product.find({name, seller: req.auth._id});

        if(existingProduct.length > 0){
            return res.status(400).json({message: "Product already exists"});
        }

        const product = await Product.create({
            name,
            MRP,
            discount,
            points,
            SKU,
            description,
            seller: req.auth._id
        });

        res.status(201).json({message: "Product launched successfully", product: product});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAllItems = async (req, res, next) => {
    try {
        const products = await Product.find({seller: req.auth._id});
        res.status(200).json({products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateItem = async (req, res, next) => {
    const productId = req.params.id;

    const item = await Product.findById(productId);

    if(!item){
        return res.status(404).json({message: "Product not found"});
    }
   
    if(item.seller.toString() !== req.auth._id.toString()){
        return res.status(401).json({message: "You are not authorized to update this product"});
    }
   
    try {

        const data = req.body;
        const { seller, ...others } = data;

        const product = await Product.findByIdAndUpdate({_id: productId}, others, {new: true});
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({others: others,product: product});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteItem = async (req, res, next) => {
    const productId = req.params.id;
    const item = await Product.findById(productId);

    if(!item){
        return res.status(404).json({message: "Product not found"});
    }
   
    if(item.seller.toString() !== req.auth._id.toString()){
        return res.status(401).json({message: "You are not authorized to delete this product"});
    }
   
    try {
        const product = await Product.findByIdAndDelete();
       
        res.status(200).json({message: "Item successfully deleted",product: product});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const afterPaymentSeller = async (req, res, next) => {
    try {
        
        const {items} = req.body;

        let seller = await Promise.all(items.map(async (item) => {
            const product = await Product.findById(item.id);
            
            let sku = product.SKU - item.qnt;
       
            await Product.findByIdAndUpdate(item.id, {SKU: sku}, {new: true});
            return (
                product.seller.toString()
            )
        }));

        // console.log(seller);
        
        seller = await Promise.all(seller.map(async (id) => {
            const order = await Promise.all(items.map(async (product) => {
                  
                return{
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

            await User.findByIdAndUpdate(id, {SoldItemsHistory: SoldItemsHistory});

            

        }));
        return res.status(200).json({message: "Seller updated successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {launchProduct, getAllItems, updateItem, deleteItem, afterPaymentSeller};
