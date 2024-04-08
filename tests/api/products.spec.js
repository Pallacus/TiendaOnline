
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const Product = require('../../src/models/product.model')

describe('Api de productos', () => {

    beforeAll(async () => {
        //conexion a la BD
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online')
    })

    afterAll(async () => {
        await mongoose.disconnect();
    })

    describe('Pruebas GET /api/products', () => {

        let response;

        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        })

        it('url /api/products existe', () => {
            expect(response.statusCode).toBe(200);
        })

        it('la respuesta debe ser en formato JSON', () => {
            expect(response.headers['content-type']).toContain('application/json'); //  toBe hace una comparación estricta
        })

        it('la respuesta debe ser un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    })

    describe('Pruebas POST /api/products', () => {

        const body = { name: 'Producto prueba', description: 'Estamos probando, esta es la descripción', price: 123, department: 'test', available: true, stock: 30 }
        let response;

        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        })
        afterAll(async () => {
            await Product.deleteMany({ department: 'test' })
        })
        it('deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        })
        it('debería incluir el _id en el body de la respuesta', () => {
            expect(response.body._id).toBeDefined();
        })
    })

    describe('Pruebas PUT /api/produccts', () => {
        const body = { name: 'Producto prueba', description: 'Estamos probando, esta es la descripción', price: 123, department: 'test', available: true, stock: 30 }
        let response;
        let newProduct;

        beforeAll(async () => {
            newProduct = await Product.create(body);
            response = await request(app).put((`/api/products/${newProduct._id}`)).send({
                price: 333,
                department: 'otro'
            })
        })
        afterAll(async () => {
            await Product.findByIdAndDelete(newProduct._id)
        })

        it('deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        })
        it('debería responder con los cambios', () => {
            expect(response.body.price).toBe(333);
            expect(response.body.department).toBe('otro');
        })

    })

    describe('Pruebas de DELETE /api/products', () => {
        const body = { name: 'Producto prueba', description: 'Estamos probando, esta es la descripción', price: 123, department: 'test', available: true, stock: 30 }
        let response;
        let newProduct;

        beforeAll(async () => {
            newProduct = await Product.create(body);
            response = await request(app).delete(`/api/products/${newProduct._id}`).send();
        })
        it('deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        })
        it('debería desaparecer el producto de la base de datos', async () => {
            const product = await Product.findById(newProduct._id);
            expect(product).toBeNull();
        })
    })

})
