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
    },
    "/api/v1/user/:id": {
        "get": {
            "tags": ["USER"],
            "description": "Select a specific user by id",
            "responses": {
                "200": {
                    "description": "User object.",
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
        },
        "put": {
            "tags": ["USER"],
            "description": "update user data by id",
            "responses": {
                "200": {
                    "description": "user updated",
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
        },
        "delete": {
            "tags": ["USER"],
            "description": "delete user by id",
            "responses": {
                "200": {
                    "description": "user deleted",
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