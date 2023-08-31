/**
 * @description user document validation library
 * @test npx jest ./src/comment/service/CommentService.spec.js
 */
const KsMf = require('ksmf');
//... load system
const app = new KsMf.app.WEB(__dirname + "/../../../").init();
const dao = app.helper.get('dao');
const userModel = dao.models['User'];
//... load target
const commentService = app.helper.get({
   name: 'CommentService',
   path: 'service',
   module: 'comment',
   dependency: {
      dao: 'dao',
      helper: 'helper'
   }
});
//... define tests
describe('UNIT_TEST_CommentService', () => {
   it('List', async done => {
      expect(commentService).toBeInstanceOf(Object);
      done();
   });
});