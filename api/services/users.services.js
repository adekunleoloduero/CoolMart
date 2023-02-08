const userModel = require('../models/user.model');



const getUsers = async(query) => {
    const newest = query.newest;
    const users = newest ? await userModel.find().sort({ createdAt: -1 }).limit(5) : await userModel.find().limit(5);
    
    //Remove password from all user objects
    const usersWithoutPasswords = users.map(user => {
        const { password, ...others } = user._doc;
        return others;
    });
    return usersWithoutPasswords;
}


const getUserById = async(id) => {
    const user = await userModel.findById(id);
    const { password, ...others } = user._doc;
    return others;
}


const updateUserProfile = async(id, body) => {
    const user = await userModel.findByIdAndUpdate(id, { $set: body}, { new: true });
    const { password, ...others } = user._doc;
    return others;
}

const deleteUser = async(id) => {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) return { message: 'Account already deleted' };
    return { message:  'Account deleted successfully.'};
}


module.exports = {
    getUsers,
    getUserById,
    updateUserProfile,
    deleteUser
}