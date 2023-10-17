const serviceAutomovil = require('../Services/serviceInventory');

function ejemplo(req, res){

    const result = serviceAutomovil.ejemploAutomovil();
    console.log(result);
    res.json({
        mensaje: result
    });
}

async function getInventory(req, res){
    try {
        const data = req.body
        const id = req.id;
        const type = req.type;
        const response =await serviceAutomovil.getInventory(data,id,type);

        if(response.err){
            return res.status(400).json(response)
        }
        return res.status(201).json(response)
    } catch (error) {
        return res.status(500).json({
            err: true,
            message: error.message,
          });
    }
}

module.exports = {
    ejemplo,
    getInventory
}