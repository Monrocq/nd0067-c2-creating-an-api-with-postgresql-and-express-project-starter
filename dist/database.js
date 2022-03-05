"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { host, host_prod, database, database_test, user, password, password_prod, ENV, DB } = process.env;
const client = new pg_1.Pool({
    host: DB === "external" ? host_prod : host,
    database: ENV === "test" ? database_test : database,
    user,
    password: DB === "external" ? password_prod : password
});
exports.default = client;
