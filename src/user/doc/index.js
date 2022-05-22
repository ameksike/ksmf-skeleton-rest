const DefaultController = require('./paths/DefaultController');
module.exports = {
    components: {
        schemas: {
            User: require('./schemas/User')
        }
    },
    paths: {
        ...DefaultController
    }
}