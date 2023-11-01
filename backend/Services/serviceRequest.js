const db = require('../Config/databaseConfig');
const serviceNotification = require('./serviceNotification');

exports.GetRequestByUser = async (id) => {
    try{
        const query = `
        SELECT
            r.*,
            v.*,
            s.name as seriesName,
            b.name as brandName
        FROM
            User u
        INNER JOIN Request r ON
            u.email = r.User_email
        INNER JOIN Vehicle v ON
            v.licensePlate = r.Vehicle_licensePlate
        INNER JOIN Series s ON
            s.idSeries = v.Series_idSeries 
        INNER JOIN Brand b ON
            b.idBrand = s.Brand_idBrand 
        WHERE
            r.User_email = ?
        ORDER BY
            r.idRequest DESC;
        `
        const [result] = await db.execute(query, [id]);
        return {error: false, result};
    }catch(error){
        return {error: true, message: error.message};
    }
}

exports.GetNonProcessedRequest = async () => {
    try{
        const query = `
        SELECT
	        u.*,
            r.*,
            v.*,
            s.name as seriesName,
            b.name as brandName
        FROM
            User u
        INNER JOIN Request r ON
            u.email = r.User_email
        INNER JOIN Vehicle v ON
            v.licensePlate = r.Vehicle_licensePlate
        INNER JOIN Series s ON
            s.idSeries = v.Series_idSeries 
        INNER JOIN Brand b ON
            b.idBrand = s.Brand_idBrand 
        WHERE
            r.state = 'pending';
        `
        const [result] = await db.execute(query);
        return {error: false, result};
    }catch(error){
        return {error: true, message: error.message};
    }
}

exports.GetProcessedRequest = async () => {
    try{
        const query = `
        SELECT
	        u.*,
            r.*,
            v.*,
            s.name as seriesName,
            b.name as brandName
        FROM
            User u
        INNER JOIN Request r ON
            u.email = r.User_email
        INNER JOIN Vehicle v ON
            v.licensePlate = r.Vehicle_licensePlate
        INNER JOIN Series s ON
            s.idSeries = v.Series_idSeries 
        INNER JOIN Brand b ON
            b.idBrand = s.Brand_idBrand 
        WHERE
            NOT (r.state = 'pending');
        `
        const [result] = await db.execute(query);
        return {error: false, result};
    }catch(error){
        return {error: true, message: error.message};
    }
}

exports.GetRequestsToAdminView = async () => {
    try{
        const query = `
        SELECT
            u.email as clientEmail,
            r.*,
            v.*,
            s.name as seriesName,
            b.name as brandName,
            u2.email as employeeEmail
            n.message as notificationMessage
        FROM
            User u
        INNER JOIN Request r ON
            u.email = r.User_email
        INNER JOIN Vehicle v ON
            v.licensePlate = r.Vehicle_licensePlate
        INNER JOIN Series s ON
            s.idSeries = v.Series_idSeries 
        INNER JOIN Brand b ON
            b.idBrand = s.Brand_idBrand
        LEFT JOIN User u2 ON
            u2.email = r.processedBy
        INNER JOIN Notification n ON
            n.Request_idRequest = r.idRequest
        ORDER BY
            r.idRequest DESC;
        `
        const [result] = await db.execute(query);
        return {error: false, result};
    }catch(error){
        return {error: true, message: error.message};
    }
}

exports.RespondRequest = async (idRequest, state, processedBy, message, userEmail) => {
    try{
        let query = `
        UPDATE
            Request
        SET
            state = ?,
            processedBy = ?
        WHERE
            idRequest = ?
        `

        let data = [
            state, 
            processedBy, 
            idRequest
        ]
        const [result] = await db.execute(query, data);

        serviceNotification.CreateNotification(userEmail, message, idRequest)

        return {error: false, result};
    }catch(error){
        return {error: true, message: error.message};
    }
}