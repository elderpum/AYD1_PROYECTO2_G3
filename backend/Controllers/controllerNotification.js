const service = require('../Services/serviceNotification');

exports.GetNotificationByUser = async (req, res) => {
    try{
        const {id} = req;
        const result = await service.GetNotificationByUser(id);
        if(result.error){
            return res.status(500).json({
                err: true,
                message: result.message
            });
        }
        return res.status(200).json({
            err: false,
            data: result.result
        });
    }catch(error){
        return res.status(500).json({
            err: true,
            message: error.message
        });
    }
}

exports.UpdateNotification = async (req, res) => {
    try{
        const {idNotification} = req.body;
        const result = await service.UpdateNotification(idNotification);
        if(result.error){
            return res.status(500).json({
                err: true,
                message: result.message
            });
        }
        return res.status(200).json({
            err: false,
            data: result.result
        });
    }catch(error){
        return res.status(500).json({
            err: true,
            message: error.message
        });
    }
}