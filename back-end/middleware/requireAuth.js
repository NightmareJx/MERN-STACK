const jwt = require('jsonwebtoken');
const User = require('../modules/user-module')

const requireAuth = async (req,res,next) => {
    // verifiying authentification

    // authorization in the req.headers contain jwt token
    const { authorization } = req.headers;

    // if there no value on it then the user is not logged in
    if (!authorization) {
        return res.status(400).json({error : 'Authorization token is required'})
    }

    // so the authorization comes like this Bearer asoudig#@54.asdqwfgaesf.qwrfwqfas
    // so we need to split it to take just the token 

    const token = authorization.split(' ')[1];

    //verifiying the token if verif faild it will go to catch methode
    // firstly you can pass information in the middleware from req like req.whatevername you put = ....
    // so basicly the token have multimple information coded that forms a token 
    // and one of the information is ssuer (iss): Identifies the issuer of the token.
    // that contain id of the user _id we will take that id 
    // and pass it in the req as user or whatever name you pass in it 
    // and then you can verify in the workout controller if req.user contain and id if it does you will show his workouts page
    
    try {
        const {_id} = jwt.verify(token , process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id');
        next();
    }
    catch {
        return res.status(400).json({error : 'request is not Authorised'})
    }


}

module.exports = requireAuth;