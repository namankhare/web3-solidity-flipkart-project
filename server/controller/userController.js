import User from '../model/user.js';

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);
        res.status(200).json({message: user});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const updateUser = async (req, res, next) => {
    try {
        
        const data = req.body;
        const { password, ...others } = data;
  
        const user = await User.findByIdAndUpdate(req.auth._id, others, {new: true});
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: user});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndDelete(req.auth._id);
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: user});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export {getUser, updateUser, deleteUser};