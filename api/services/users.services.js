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

//Return the number of users that registered for each month in the current year
const getUsersStats = async () => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const stats = await userModel.aggregate([
        { 
            $match: { createdAt: { $gte: lastYear } }
        },
        { 
            $project: { month: { $month: '$createdAt' } }
        },
        { 
            $group: { _id: '$month', total: { $sum: 1} }
        },
        {
            $sort: { _id: -1}
        }
    ]);
    return stats;
}



module.exports = {
    getUsers,
    getUserById,
    updateUserProfile,
    deleteUser,
    getUsersStats,
}