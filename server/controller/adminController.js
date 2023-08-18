import Product from '../model/product.js';
import User from '../model/user.js';
import { signout } from './authController.js';

const viewAllCustomer = async (req, res, next) => {
    try {
        const customers = await User.find({role: 0});
        res.status(200).json({
        status: 'success',
        customers
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    }
}
const viewAllSellers = async (req, res, next) => {
    try {
        const sellers = await User.find({role: 1});
        res.status(200).json({
        status: 'success',
        sellers
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    }
}

const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
         
        const user = await User.findByIdAndUpdate(userId, req.body, {new: true});
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User updated successfully", user});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
         
        const user = await User.findByIdAndDelete(userId);
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        if(user.role === 1 )
        {
            const products = await Product.findByIdAndDelete({seller: userId});
            res.status(200).json({message: "Products removed", products});
        }
        if(user._id === userId)
        {
            signout();
        }
        res.status(200).json({message: "User deleted successfully", user});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export {viewAllCustomer, viewAllSellers, updateUser, deleteUser};
