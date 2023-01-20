

const getUsers = async(req, res, next) => {
    return res.status(200).json('Get users');
}


const getUserById = async(req, res, next) => {
    return res.status(200).json('Get user by Id');
}


const updateUserProfile = async(req, res, next) => {
    return res.status(200).json('update user profile');
}


const deleteUser = async(req, res, next) => {
    return res.status(200).json('Delete users');
}



module.exports = {
    getUsers,
    getUserById,
    updateUserProfile,
    deleteUser
}