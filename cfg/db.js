require("dotenv").config();
module.exports = {
	"development": {
		"host": process.env["DB_HOST"],
		"port": process.env["DB_PORT"],
		"database": process.env["DB_NAME"],
		"username": process.env["DB_USER"],
		"password": process.env["DB_PASS"],
		"dialect": process.env["DB_DIALECT"],
		"protocol": "mysql"
	},
	"production": {
		"url": process.env["DATABASE_AWS"],
		"dialect": "postgres",
		"dialectOptions": {
			"ssl": {
				"rejectUnauthorized": false
			}
		}
	},
	"test": {
		"dialect": "sqlite",
		"storage": ":memory:",
		"logging": false
	}
};