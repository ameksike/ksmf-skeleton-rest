module.exports = {
    components: {
        schemas: {
            Tag: require('./schemas/Tag'),
            Comment: require('./schemas/Comment')
        }
    },
    paths: {
        ...require('./paths/CommentController')
    }
}