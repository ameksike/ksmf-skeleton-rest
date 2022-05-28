module.exports = {
    "/api/v1/comment": {
        "get": {
            "tags": ["COMMENT"],
            "description": "Returns all comments from the system",
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
                    "example": '[["flightId", [666, 222], "in"],["date", "2022-05-27", "gte"]]'
                }
            ],
            "responses": {
                "200": {
                    "description": "A list of comment.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Comment"
                                }
                            }
                        }
                    }
                }
            }
        },
        "post": {
            "tags": ["COMMENT"],
            "description": "create or add a new comment",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": require('../schemas/CommentRequest')
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
                                "$ref": "#/components/schemas/Comment"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/comment/{id}": {
        "parameters": [
            {
                "name": "id",
                "in": "path",
                "description": "Comment ID",
                "required": true,
                "schema": {
                    "type": "integer",
                    "format": "int64"
                }
            }
        ],
        "get": {
            "tags": ["COMMENT"],
            "description": "Select a specific comment by id",
            "responses": {
                "200": {
                    "description": "Comment object.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/Comment"
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "tags": ["COMMENT"],
            "description": "Update comment data by id",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": require('../schemas/CommentRequest')
                    }
                }
            },
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "$ref": "#/components/schemas/Comment"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "comment updated",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/Comment"
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "tags": ["COMMENT"],
            "description": "delete comment by id",
            "responses": {
                "200": {
                    "description": "comment deleted",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/Comment"
                            }
                        }
                    }
                }
            }
        }
    }
}