const DefaultController = require('./paths/DefaultController');
module.exports = {
    components: {
        schemas: {
            User: require('./schemas/User'),
            Filter: require('./schemas/Filter'),
        }
    },
    paths: {
        ...DefaultController
    }
}