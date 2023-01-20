

const signUp = async(req, res, next) => {
    return res.status(201).json('SignUp route');
}


const signIn = async(req, res, next) => {
    return res.status(200).json('SignIn route');
}




module.exports = {
    signUp,
    signIn
}