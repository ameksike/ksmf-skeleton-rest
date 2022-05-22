module.exports = {
    "/api/v1/user": {
        "get": {
            "tags": ["USER"],
            "description": "Returns all users from the system",
            "responses": {
                "200": {
                    "description": "A list of user.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "post": {
            "tags": ["USER"],
            "description": "create or add a new user",
            "responses": {
                "200": {
                    "description": "user created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    }
                }
            }
        }
    }
}