module.exports = {
    "/api/v1/tag": {
        "get": {
            "tags": ["TAG"],
            "description": "Returns all tags from the system",
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
                    "example": '[["name", ["Complaints", "Claims"], "in"]]'
                }
            ],
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