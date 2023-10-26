const service = require('../Services/serviceUser')
const jwt = require('jsonwebtoken');
const mailer = require('../Config/mailerConfig')

let accessCodes = {};

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
        
        const tokenAuth = jwt.sign({tipo: type, id: result.user.email}, process.env.JWT_SECRET_PW, {expiresIn:'300s'})

        return res.json({authExitoso:result.authExitoso, tokenAuth, message:result.message})
    }catch(error){
        return res.status(401).json({authExitoso:false, message:error.message})
    }
}

exports.createEmployee = async (req, res) => {
    const result = await service.newEmployee(req.body);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
}

function generateRandomCode() {
    const min = 100000; // El número más pequeño de 6 dígitos (100000)
    const max = 999999; // El número más grande de 6 dígitos (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.generateAccessCode = async (req, res) => {
    const {email} = req.body;
    const info = await service.existUser(email);

    if(info.error){
        console.log(info.message);
        return res.status(400).json(info);
    }

    const code = generateRandomCode();

    const mail = await mailer.sendEmail(email, 'Codigo de acceso', `Su codigo de acceso es: ${code}`)
    if(mail.error){
        console.log(mail.message);
        return res.status(400).json(mail);
    }

    accessCodes[email] = code;

    setTimeout(() => {
        delete accessCodes[email];
    }, 120000);

    return res.status(200).json({error: false, message: "Código de acceso generado exitosamente"});
}

exports.loginByCode = async (req, res) => {
    const {email, code} = req.body;
    const info = await service.getUserInfo(email)

    if(info.error){
        console.log(info.message);
        return res.status(400).json(info);
    }

    if(email in accessCodes){
        if(accessCodes[email] === code){
            const tokenAuth = jwt.sign({tipo: info.data.type, id: info.data.email}, process.env.JWT_SECRET_PW, {expiresIn:'300s'})
            delete accessCodes[email];
            return res.status(200).json({authExitoso:true, tokenAuth, message:"Bienvenido!"})
        }

        return res.status(401).json({authExitoso:false, message:"Código incorrecto"})
    }

    return res.status(401).json({authExitoso:false, message:"Código expirado"})
}

exports.getUserInfo = async (req, res) => {
    const {email} = req.id;
    const info = await service.getUserInfo(email)

    if(info.error){
        console.log(info.message);
        return res.status(400).json(info);
    }

    return res.status(200).json(info);
}