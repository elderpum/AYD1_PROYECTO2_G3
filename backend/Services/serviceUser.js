const db = require('../Config/databaseConfig');
const mailer = require('../Config/mailerConfig')
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
  
exports.newEmployee = async (data) => {
    try{
        const hash = await bcrypt.hash(data.passw, 10);

        const query = 'INSERT INTO User (email, name, lastName, birthday, license, address, phone, userName, passw, type) VALUES (?,?,?,?,?,?,?,?,?,?)';

        const values =[
            data.email, 
            data.name, 
            data.lastName, 
            '2000/01/01', 
            '', 
            data.address, 
            data.phone, 
            data.userName, 
            hash, 
            'employee'
        ];

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al registrar al usuario'}
        }

        const emailBody = `
            <p>¡Bienvenido, ${data.name + data.lastName}!</p>
            <p>Aquí están tus credenciales de inicio de sesión:</p>
            <ul>
            <li><strong>Nombre de usuario:</strong> ${data.userName}</li>
            <li><strong>Contraseña:</strong> ${data.passw}</li>
            </ul>
            <p>Para iniciar sesión, simplemente haz clic en el siguiente enlace:</p>
            <a href="${'http://localhost:3000/loginEmpleado'}">Iniciar sesión</a>
            <p>¡Gracias por unirte a nuestra plataforma!</p>
        `;
        
        const mail = await mailer.sendEmail(data.email, 'Bienvenido a RentCar', emailBody)
        if(mail.error){
            console.log(mail.message);
            return {error: true, message: mail.message};
        }

        return {error: false, message: "Has sido registrado exitosamente"};
    }catch(error){
        return {error:true, message: error.message};
    }
}

exports.updateEmployee = async (data) => {
    try{
        const query = 'UPDATE User SET name = ?, lastName = ?, address = ?, phone = ? WHERE email = ?';

        const values =[
            data.name, 
            data.lastName, 
            data.address, 
            data.phone, 
            data.email
        ];

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al actualizar al usuario'}
        }

        return {error: false, message: "Has sido actualizado exitosamente"};
    }catch(error){
        return {error:true, message: error.message};
    }
}

exports.deleteEmployee = async (data) => {
    try{
        const query = 'DELETE FROM User WHERE email = ?';

        const values =[data.email];

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al eliminar al usuario'}
        }

        return {error: false, message: "Has sido eliminado exitosamente"};
    }catch(error){
        return {error:true, message: error.message};
    }
}

exports.getAllEmployees = async () => {
    try{
        const [result] = await db.execute('SELECT * FROM User u WHERE u.type = "employee";');

        if(result.length === 0){
            return {error: true, message:"No hay ningun empleado registrado"}
        }

        return {error: false, message:"Empleados encontrados", data: result}
    }catch (error){
        return {error: true, message: error.message}  
    }
}

exports.existUser = async (user) => {
    try{
        const [result] = await db.execute('SELECT * FROM User u WHERE u.email = ?;', [user])

        if(result.length === 0){
            return {error: true, message:"No hay ningun usuario registrado con ese correo"}
        }

        return {error: false, message:"El usuario existe"}
    }catch (error){
        return {error: true, message: error.message}  
    }
}

exports.getUserInfo = async (user) => {
    try{
        const [result] = await db.execute('SELECT * FROM User u WHERE u.email = ?;', [user])

        if(result.length === 0){
            return {error: true, message:"No hay ningun usuario registrado con ese correo"}
        }

        return {error: false, message:"El usuario existe", data: result[0]}
    }catch (error){
        return {error: true, message: error.message}  
    }
}

exports.getUserInfoByUsername = async (user) => {
    try{
        const [result] = await db.execute('SELECT * FROM User u WHERE u.userName = ?;', [user])

        if(result.length === 0){
            return {error: true, message:"No hay ningun usuario registrado con ese correo"}
        }

        return {error: false, message:"El usuario existe", data: result[0]}
    }catch (error){
        return {error: true, message: error.message}  
    }
}