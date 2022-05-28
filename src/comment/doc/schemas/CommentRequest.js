module.exports = {
    type: "object",
    properties: {
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
        tags: {
            "type": "array",
            "items": {
                type: "integer",
                description: "Tag id",
            },
            "description": "List of Tag id",
            example: [31, 33, 25]
        }
    },
    required: ['comment', 'userId', 'flightId']
}