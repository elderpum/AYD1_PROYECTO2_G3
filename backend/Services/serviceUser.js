const db = require('../Config/databaseConfig');
const bcrypt = require('bcrypt');

//Create client
exports.newClient = async (data) => {
    try{
        const hash = await bcrypt.hash(data.passw, 10);
        const bornDate = new Date(data.birthday);
        const date = new Date();
        let age = date.getFullYear() - bornDate.getFullYear();

        if(date.getMonth() < bornDate.getMonth() ||
        (date.getMonth() === bornDate.getMonth() &&
        date.getDate() < bornDate.getDate())){        
            age--;
        }

        if(age < 18){
            return {error: true, message: "El usuario debe ser mayor de edad"};
        }

        const query = 'INSERT INTO User (email, name, lastName, birthday, license, address, phone, userName, passw, type) VALUES (?,?,?,?,?,?,?,?,?,?)';

        const values =[
            data.email, 
            data.name, 
            data.lastName, 
            data.birthday, 
            data.license, 
            data.address, 
            data.phone, 
            data.userName, 
            hash, 
            'client'
        ];

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al registrar al usuario'}
        }

        return {error: false, message: "Has sido registrado exitosamente"};
    }catch(error){
        return {error:true, message: error.message};
    }
}

exports.auth= async (user, passw, type) => {
    try{
        const [result] = await db.execute('SELECT * FROM User u WHERE (u.email = ? OR u.userName = ?) AND u.type = ?;', [user, user, type])

        if(result.length === 0){
            return {authExitoso: false, message:"El usuario no existe"}
        }

        console.log(result[0].passw)
        console.log(passw)
        const authenticated = await bcrypt.compare(passw, result[0].passw)

        if(authenticated){
            return {authExitoso:true, user: result[0], message:"Bienvenido!"}
        }

        return {authExitoso:false, message:"Contraseña incorrecta"}
    }catch (error){
        return {authExitoso: false, message: error.message}    
    }
}