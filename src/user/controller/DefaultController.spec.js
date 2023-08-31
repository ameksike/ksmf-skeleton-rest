const KsMf = require('ksmf');
//... load system
const app = new KsMf.app.WEB(__dirname + "/../../../").init();
const web = app.web;
const dao = app.helper.get('dao');
const userModel = dao.models['User'];
//... define integration test handler
const supertest = require('supertest');
const req = supertest(web);
//... define options 
const baseUrl = '/api/v1/user';
const models = {};
const header = { 'Authorization': 'Bearer ' };
//... define INTEGRATION TEST
describe('INTEGRATION_TEST_User_Default_Controller', () => {
    beforeAll(async () => {
        try {
            jest.useFakeTimers();
            await dao.driver.sync({ force: true });
            //... prepare data 
            await userModel.bulkCreate([
                {
                    id: 1,
                    name: 'Mis Doe',
                    age: 25,
                    job: 'Developer'
                }, {
                    id: 2,
                    name: 'Mari Carmen',
                    age: 15,
                    job: 'Student'
                }, {
                    id: 3,
                    name: 'Lucy Light',
                    age: 30,
                    job: 'lawyer'
                }
            ]);
        } catch (error) {
            console.log('[TEST_ERROR] ', error?.message || error);
        }
    });

    afterAll(async () => {
        for (let i in models) {
            models[i].destroy();
        }
    });

    it('List of users', (done) => {
        req
            .get(baseUrl)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body.data).toBeInstanceOf(Array);
                expect(res.body.data.length > 2).toBe(true);
                return done();
            });
    });

    it('Select user', (done) => {
        req
            .get(baseUrl + '/1')
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.age).toBe(25);
                return done();
            });
    });

    it('Insert user', (done) => {
        req
            .post(baseUrl)
            .send({
                name: 'Mito Stranger',
                age: 35,
                job: 'lawyer'
            })
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.age).toBe(35);
                return done();
            });
    });

    it('Update user', (done) => {
        req
            .put(baseUrl + '/1')
            .send({
                name: 'Oto',
                age: 44
            })
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.age).toBe(44);
                return done();
            });
    });

    it('Delete user', (done) => {
        req
            .delete(baseUrl + '/1')
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.age).toBe(44);
                return done();
            });
    });
});

