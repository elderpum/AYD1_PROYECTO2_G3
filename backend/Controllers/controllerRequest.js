const service = require('../Services/serviceRequest');

exports.GetRequestByUser = async (req, res) => {
    try {
        const { id } = req;
        const result = await service.GetRequestByUser(id);
        if (result.error) {
            return res.status(500).json({
                err: true,
                message: result.message
            });
        }
        return res.status(200).json({
            err: false,
            data: result.result
        });
    } catch (error) {
        return res.status(500).json({
            err: true,
            message: error.message
        });
    }
}

exports.GetNonProcessedRequest = async (req, res) => {
    try {
        const result = await service.GetNonProcessedRequest();
        if (result.error) {
            return res.status(500).json({
                err: true,
                message: result.message
            });
        }
        return res.status(200).json({
            err: false,
            data: result.result
        });
    } catch (error) {
        return res.status(500).json({
            err: true,
            message: error.message
        });
    }
}

exports.GetRequestsToAdminView = async (req, res) => {
    try {
        const result = await service.GetRequestsToAdminView();
        if (result.error) {
            console.log(result.message);
            return res.status(500).json({
                err: true,
                message: result.message
            });
        }
        return res.status(200).json({
            err: false,
            data: result.result
        });
    } catch (error) {

        console.log(error.message);
        return res.status(500).json({
            err: true,
            message: error.message
        });
    }
}

exports.RespondRequest = async (req, res) => {
    try {
        const { id } = req;
        const { idRequest, state, message, userEmail } = req.body;
        const result = await service.RespondRequest(idRequest, state, id, message, userEmail);
        if (result.error) {
            return res.status(500).json({
                err: true,
                message: result.message
            });
        }
        return res.status(200).json({
            err: false,
            data: result.result
        });
    } catch (error) {
        return res.status(500).json({
            err: true,
            message: error.message
        });
    }
}

exports.GetProcessedRequests = async (req, res) => {
    try {
        const result = await service.GetProcessedRequest();
        if (result.error) {
            return res.status(500).json({
                err: true,
                message: result.message
            });
        }
        return res.status(200).json({
            err: false,
            data: result.result
        });
    } catch (error) {
        return res.status(500).json({
            err: true,
            message: error.message
        });
    }
}