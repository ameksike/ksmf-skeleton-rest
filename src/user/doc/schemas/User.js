module.exports = {
    type: "object", 
    properties: {
        id: {
            type: "integer", 
            description: "user system id number ",
            example: 15
        },
        name: {
            type: "string", 
            description: "User's full name including first and last name", 
            example: "Lucy Light Ksike",
        },
        age: {
            type: "integer", 
            description: "Define the age of the user", 
            example: 25
        },
        job: {
            type: "string", 
            description: "Define the ocupation of the user", 
            example: "Developer"
        },
        note: {
            type: "string", 
            description: "Extra information related to the user", 
            example: "retired"
        }
    },
    required: ['name']
}