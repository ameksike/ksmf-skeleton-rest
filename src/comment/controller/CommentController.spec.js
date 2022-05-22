const KsMf = require('ksmf');
//... load system
const app = new KsMf.app.WEB(__dirname + "/../../../").init();
const web = app.web;
const dao = app.helper.get('dao');
const userModel = dao.models['user'];
const tagModel = dao.models['tag'];
const commentModel = dao.models['comment'];
//... define integration test handler
const supertest = require('supertest');
const req = supertest(web);
//... define options 
const baseUrl = '/api/v1/comment';
const models = {};
const header = { 'Authorization': 'Bearer ' };
//... define INTEGRATION TEST
describe('INTEGRATION_TEST_Comment_Default_Controller', () => {
    beforeAll(async () => {
        try {
            jest.useFakeTimers();
            await dao.driver.sync({ force: true });
            //... prepare data 
            models.user = await userModel.create({
                id: 1,
                name: 'Mis Doe',
                age: 25,
                job: 'Developer'
            });
            const tags = await tagModel.bulkCreate([
                { "name": "Críticos", "id": 1 },
                { "name": "Históricos", "id": 2 },
                { "name": "Literarios", "id": 3 },
                { "name": "Disertaciones", "id": 4 }
            ]);
            const comments = await commentModel.bulkCreate([
                {
                    "id": 1,
                    "comment": "this is a comment test 1",
                    "userId": models.user.id,
                    "flightId": 222,
                }, {
                    "id": 2,
                    "comment": "this is a comment test 2",
                    "userId": models.user.id,
                    "flightId": 555,
                }, {
                    "id": 3,
                    "comment": "this is a comment test 3",
                    "userId": models.user.id,
                    "flightId": 222,
                }
            ]);
        } catch (error) {
            console.log('[TEST_ERROR] ', error && error.message ? error.message : error);
        }
    });

    afterAll(async () => {
        for (let i in models) {
            models[i].destroy();
        }
    });

    it('List of comments', (done) => {
        req
            .get(baseUrl)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body.length > 2).toBe(true);
                return done();
            });
    });

    it('List of comments with filters and sort', (done) => {
        req
            .get(baseUrl + '?page=0&size=10&filter={"flightId":222,"userId":1}&sort=[["id", "DESC"]]')
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body.length === 2).toBe(true);
                return done();
            });
    });

    it('Select comment', (done) => {
        req
            .get(baseUrl + '/1')
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.flightId).toBe(222);
                return done();
            });
    });

    it('Insert comment', (done) => {
        req
            .post(baseUrl)
            .send({
                comment: 'Test 5 Comment',
                flightId: 666,
                userId: 1
            })
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.flightId).toBe(666);
                return done();
            });
    });


    it('Insert comment with tags', (done) => {
        req
            .post(baseUrl)
            .send({
                "comment": "Test 9 Comment",
                "flightId": 666,
                "userId": 1,
                "tags": [1,2]
            })
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.flightId).toBe(666);
                return done();
            });
    });

    it('Update comment and tags', (done) => {
        req
            .put(baseUrl + '/1')
            .send({
                "flightId": 999,
                "tags": [3]
            })
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.flightId).toBe(999);
                return done();
            });
    });

    it('Delete comment', (done) => {
        req
            .delete(baseUrl + '/1')
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.flightId).toBe(999);
                return done();
            });
    });
});

