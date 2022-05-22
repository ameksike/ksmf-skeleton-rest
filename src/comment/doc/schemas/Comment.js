module.exports = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            description: "comment system id number ",
            example: 15
        },
        comment: {
            type: "string",
            description: "Content of the comment",
            example: "This has been a great flight, it has lasted more than 12 hours and it has been very entertaining",
        },
        date: {
            type: "date",
            description: "Comment creation date and time",
            example: "2022-05-15",
        },
        flightId: {
            type: "integer",
            description: "the flight identifier",
            example: 666
        },
        userId: {
            type: "integer",
            description: "the user owner identifier",
            example: 153
        },
        user: {
            type: "object",
            description: "user owner as object",
            "$ref": "#/components/schemas/User"
        },
        tags: {
            "type": "array",
            "items": {
                "$ref": "#/components/schemas/Tag"
            },
            "description": "Extra information related to the user"
        }
    },
    required: ['comment', 'userId', 'flightId']
}