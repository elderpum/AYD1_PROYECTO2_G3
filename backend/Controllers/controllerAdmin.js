
const serviceAdmin = require('../Services/serviceAdmin');


async function updateClient(req, res){
    try {
        const response = await serviceAdmin.updateClient(req.body.client, req.type);  
        const response2 = await serviceAdmin.getClients(req.body);  
        if (!response.ok) {
            return res.status(400).json({
                ok: false, 
                message: response.message,
                clients: [],
                totalPages: 0
            });
        }
        return res.status(201).json({
            ok: true, 
            message: "Has sido actualizado exitosamente",
            clients: response2.clients,
            totalPages: response2.totalPages
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
            clients: [],
            totalPages: 0
        });
    }

}

async function deleteClient(req, res){
    try {
        const response = await serviceAdmin.deleteClient(req.body, req.type);    
        const response2 = await serviceAdmin.getClients(req.body);
        if (!response.ok) {
            return res.status(400).json({
                ok: false, 
                message: response.message,
                clients: [],
                totalPages: 0
            });
        }
        return res.status(201).json({
            ok: true, 
            message: response.message,
            clients: response2.clients,
            totalPages: response2.totalPages
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
            clients: [],
            totalPages: 0
        });
    }

}

async function createClient(req, res){
    try {
        const response = await serviceAdmin.createClient(req.body.client);    
        const response2 = await serviceAdmin.getClients(req.body);
        if (!response.ok) {
            return res.status(400).json({
                ok: false, 
                message: response.message,
                clients: [],
                totalPages: 0
            });
        }
        return res.status(201).json({
            ok: true, 
            message: "Has sido registrado exitosamente",
            clients: response2.clients,
            totalPages: response2.totalPages
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
            clients: [],
            totalPages: 0
        });
    }

}

async function getClients(req, res){
    try {
        const response = await serviceAdmin.getClients(req.body, req.type);    
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