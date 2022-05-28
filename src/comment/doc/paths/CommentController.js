module.exports = {
    "/api/v1/comment": {
        "get": {
            "tags": ["COMMENT"],
            "description": "Returns all comments from the system",
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
    "/api/v1/comment/:id": {
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