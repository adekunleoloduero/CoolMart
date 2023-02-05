const { userServices } = require('../services/index');



const getUsers = async(req, res, next) => {
    const query = req.query;
    try {
        const response = await userServices.getUsers(query);
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getUserById = async(req, res, next) => {
    const id = req.params.id;
    try {
        const response = await userServices.getUserById(id);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const updateUserProfile = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const response = await userServices.updateUserProfile(id, body);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const deleteUser = async(req, res, next) => {
    const id = req.params.id;
    try {
        const response = await userServices.deleteUser(id);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getUsersStats = async(req, res, next) => {
    try {
        const response = await userServices.getUsersStats();
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    getUsers,
    getUserById,
    updateUserProfile,
    deleteUser,
    getUsersStats
}