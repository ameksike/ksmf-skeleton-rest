module.exports = {
    "/api/v1/user": {
        "get": {
            "tags": ["USER"],
            "description": "Returns all users from the system",
            "parameters": [
                {
                    "name": "page",
                    "in": "path",
                    "description": "Number of data page to load, by default is 0",
                    "required": false,
                    "schema": {
                        "type": "integer"
                    },
                    "example": 0
                },
                {
                    "name": "size",
                    "in": "path",
                    "description": "Number records to load by page, by default is 10",
                    "required": false,
                    "schema": {
                        "type": "string"
                    },
                    "example": 10
                },
                {
                    "name": "sort",
                    "in": "path",
                    "description": "List of fields by which you want to order, for each one the type of ordering is specified ['ASC', 'DESC']",
                    "required": false,
                    "schema": {
                        "type": "string"
                    },
                    "example": '[["id", "DESC"]]'
                },
                {
                    "name": "filter",
                    "in": "path",
                    "description": "Object composed of one or more search criteria, each property represents a criteria based on equality with the associated value",
                    "required": false,
                    "schema": {
                        "type": "string"
                    },
                    "example": '[["job", "dev", "iLike"],["age", 12, "gte"]]'
                }
            ],
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
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
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
            "description": "Update user data by id",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
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