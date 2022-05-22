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
    }
}