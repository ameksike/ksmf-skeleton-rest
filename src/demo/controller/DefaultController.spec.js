const KsMf = require('ksmf');
const app = new KsMf.app.WEB(__dirname + "/../../../").init();
const web = app.web;
const dao = app.helper.get('dao');

const supertest = require('supertest');
const req = supertest(web);

const baseUrl = '/api/v1/demo';
const models = {};
const header = { 'Authorization': 'Bearer ' };

describe('Demo_Default_Controller', () => {
    beforeAll(async () => {
        try {
            // jest.useFakeTimers();
            // await app.dao.driver.sync({ force: true });

        } catch (error) {
            console.log(error.toString());
        }
    });

    afterAll(async () => {
        for (let i in models) {
            models[i].destroy();
        }
    });

    it('List', (done) => {
        req
            .get(baseUrl)
            .end((error, res) => {
                done();
            });
        done();
    });

    it('Select', (done) => {
        req
            .get(baseUrl + '/reasons/test1')
            .end((error, res) => {
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(typeof(res.body.message) ).toBe('string');
                done();
            });
        done();
    });

    it('Insert', (done) => {
        req
            .post(baseUrl)
            .set(header)
            .send({
                "action_type": "register",
                "device_id": "d9588fb6b79eba7dfd1c2bb98f57fbb8",
            })
            .end((error, res) => {
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(typeof(res.body.message) ).toBe('string');
                done();
            });
    });
});

