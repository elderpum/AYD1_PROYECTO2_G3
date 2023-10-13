const service = require('../Services/serviceUser')
const jwt = require('jsonwebtoken');

exports.createClient = async (req, res) => {
    const result = await service.newClient(req.body);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
}

exports.login = async (req, res) => {
    try{
        const {user, password, type} = req.body;
        const result = await service.auth(user, password, type);

        if(!result.authExitoso){
            return res.json({authExitoso: result.authExitoso, message: result.message})
        }
        
        console.log(result)
        const tokenAuth = jwt.sign({tipo: type, id: result.user.email}, process.env.JWT_SECRET_PW, {expiresIn:'300s'})

        return res.json({authExitoso:result.authExitoso, tokenAuth, message:result.message})
    }catch(error){
        return res.status(401).json({authExitoso:false, message:error.message})
    }
}