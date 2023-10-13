const service = require('../Services/serviceUser')

exports.createClient = async (req, res) => {
    const result = await service.newClient(req.body);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
}