const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const db = require('../Config/databaseConfig')

jest.mock('../Config/databaseConfig');

describe('vehicles api', ()=>{
    //Update rental fee
    test('should return 401 with error message', async ()=>{
        await api
            .put('/api/vehiculo/actualizarTarifa')
            .expect(401)
    })
})