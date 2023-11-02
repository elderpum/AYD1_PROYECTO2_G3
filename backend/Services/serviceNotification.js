const db = require('../Config/databaseConfig');

exports.CreateNotification = async (userEmail, message, idRequest) => {
    try{
        const query = `
            INSERT INTO Notification (User_email, message, state, date_, Request_idRequest) VALUES (?, ?, ?, NOW(), ?);
            `
        const data = [
            userEmail,
            message,
            'pending',
            idRequest
        ]

        db.execute(query, data);
    }catch(error){
        console.log(error.message);
    }
}

exports.GetNotifications = async (userEmail) => {
    try{
        const query = `
            SELECT
                *
            FROM
                Notification
            WHERE
                User_email = ?
            ORDER BY
                idNotification DESC;
            `
        const [result] = await db.execute(query, [userEmail]);
        return {error: false, result};
    }catch(error){
        return {error: true, message: error.message};
    }
}

exports.UpdateNotification = async (idNotification) => {
    try{
        const query = `
            UPDATE
                Notification
            SET
                state = 'viewed'
            WHERE
                idNotification = ?
            `
        const [result] = await db.execute(query, [idNotification]);
        return {error: false, result};
    }catch(error){
        return {error: true, message: error.message};
    }
}