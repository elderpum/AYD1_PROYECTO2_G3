const db = require("../Config/databaseConfig");
const bcrypt = require('bcrypt');

async function updateClient(data, type) {
    try {
        /*
        if (type != 'client') {
            return {
                message: 'El usuario no es de tipo Cliente',
                ok: false
            };
        }
        */
        query = `UPDATE User SET name = ?, lastName = ?, birthday = ?, license= ?, address= ?, phone= ?,userName= ?
        WHERE email = ?;`
        const params = [data.nombre, data.apellido, data.nacimiento, data.licencia, data.direccion, data.telefono, data.user, data.email];
        await db.query(query, params);
        return {
            message: "Actualizado correctamente",
            ok: true
        };
    } catch (error) {
        return {
            message: error.message,
            ok: false
        };
    }
}

async function deleteClient(data, type){
    try {
        /*
        if (type != 'client') {
            return {
                message: 'El usuario no es de tipo Cliente',
                ok: false
            };
        }
        */
        query = `DELETE FROM User WHERE email = ?;`
        const params = [data.email];
        await db.query(query, params);
        return {
            message: "Eliminado correctamente",
            ok: true
        };
    } catch (error) {
        return {
            message: error.message,
            ok: false
        };
    }
}

async function createClient(data){
    try{
        const hash = await bcrypt.hash(data.password, 10);
        const bornDate = new Date(data.birthday);
        const date = new Date();
        let age = date.getFullYear() - bornDate.getFullYear();

        if(date.getMonth() < bornDate.getMonth() ||
        (date.getMonth() === bornDate.getMonth() &&
        date.getDate() < bornDate.getDate())){        
            age--;
        }

        if(age < 18){
            return {ok: false, message: "El usuario debe ser mayor de edad"};
        }

        const query = 'INSERT INTO User (email, name, lastName, birthday, license, address, phone, userName, passw, type) VALUES (?,?,?,?,?,?,?,?,?,?)';

        const values =[
            data.email, 
            data.nombre, 
            data.apellido, 
            data.nacimiento, 
            data.licencia, 
            data.direccion, 
            data.telefono, 
            data.user, 
            hash, 
            'client'
        ];

        const result = await db.execute(query, values);

        if(!result){
            return {ok: false, message: 'Error al registrar al usuario'}
        }

        return {ok: true, message: "Has sido registrado exitosamente"};
    }catch(error){
        return {ok:false, message: error.message};
    }
}

async function getClients(data){
    try {
        query = `SELECT name,lastName,birthday,license,address,email,phone,userName FROM User where type = 'client';`
        cosnt [result] = await db.query(query, params);

        const clientsArray = [];

        for(const client of result){
            clientsArray.push({
                nombre: client.name,
                apellido: client.lastName,
                nacimiento: client.birthday,
                licencia: client.license,
                direccion: client.address,
                email: client.email,
                telefono: client.phone,
                user: client.userName
            });
        }

        const arregloBidimensional = [];

        for (let i = 0; i < vehiclesArr.length; i += 9) {
            const subarreglo = vehiclesArr.slice(i, i + 9);
            arregloBidimensional.push(subarreglo);
        }

        if(arregloBidimensional.length == 0){
            return {
              ok: false,
              message: "No hay clientes disponibles",
              clients:arregloBidimensional,
              totalpages: 0
            }
          }

        return {
            message: "Clientes Encontrados",
            ok: true,
            clients: arregloBidimensional[data.page -1],
            totalpages: arregloBidimensional.length
        };
    } catch (error) {
        return {
            message: error.message,
            ok: false,
            clients: [],
            totalpages: 0
        };
    }
}


module.exports = {
    updateClient,
    deleteClient,
    createClient,
    getClients
}