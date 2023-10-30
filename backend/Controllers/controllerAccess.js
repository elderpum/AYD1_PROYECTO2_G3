const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.isAClient = (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

        if(decoded.tipo != 'client'){
            return res.status(401).json({
                err: true,
                message: 'Invalid type token'
            });
        }

        req.id = decoded.id;
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}

exports.isAnEmployee = (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);
        console.log(decoded)
        if(decoded.tipo != 'employee' && decoded.tipo != 'admin' ){
            return res.status(401).json({
                err: true,
                message: 'Invalid type token'
            });
        }

        req.id = decoded.id;
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}

exports.anyRole = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

        if(decoded.tipo != 'client' && decoded.tipo != 'admin' && decoded.tipo != 'employee'){
          return res.status(401).json({
              err: true,
              message: 'Invalid token'
          });
        }
        req.id = decoded.id;
        req.type = decoded.tipo;
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}

exports.isAnAdmin = (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

        if(decoded.tipo != 'admin'){
            return res.status(401).json({
                err: true,
                message: 'Invalid type token'
            });
        }

        req.id = decoded.id;
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}
