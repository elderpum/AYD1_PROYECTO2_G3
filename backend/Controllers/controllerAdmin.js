
const serviceAdmin = require('../Services/serviceAdmin');


async function updateClient(req, res){
    try {
        const response = await serviceAdmin.updateClient(req.body, req.type);    
        if (!response.ok) {
            return res.status(400).json(response);
        }
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }

}

async function deleteClient(req, res){
    try {
        const response = await serviceAdmin.deleteClient(req.body, req.type);    
        if (!response.ok) {
            return res.status(400).json(response);
        }
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }

}

async function createClient(req, res){
    try {
        const response = await serviceAdmin.createClient(req.body);    
        if (!response.ok) {
            return res.status(400).json(response);
        }
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }

}

async function getClients(req, res){
    try {
        const response = await serviceAdmin.deleteClient(req.body, req.type);    
        if (!response.ok) {
            return res.status(400).json(response);
        }
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
            clients:[],
            totalpages: 0
        });
    }

}

module.exports = {
    updateClient,
    deleteClient,
    createClient,
    getClients
}