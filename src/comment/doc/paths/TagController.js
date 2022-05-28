module.exports = {
    "/api/v1/tag": {
        "get": {
            "tags": ["TAG"],
            "description": "Returns all tags from the system",
            "responses": {
                "200": {
                    "description": "A list of tag.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Tag"
                                }
                            }
                        }
                    }
                }
            }
        },
        "post": {
            "tags": ["TAG"],
            "description": "create or add a new tag",
            "responses": {
                "200": {
                    "description": "user created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/Tag"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/tag/:id": {
        "get": {
            "tags": ["TAG"],
            "description": "Select a specific tag by id",
            "responses": {
                "200": {
                    "description": "Tag object.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/Tag"
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "tags": ["TAG"],
            "description": "Update tag data by id",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "$ref": "#/components/schemas/Tag"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "tag updated",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/Tag"
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "tags": ["TAG"],
            "description": "delete tag by id",
            "responses": {
                "200": {
                    "description": "tag deleted",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/Tag"
                            }
                        }
                    }
                }
            }
        }
    }
}