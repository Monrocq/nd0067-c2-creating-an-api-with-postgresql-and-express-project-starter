"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const users_spec_1 = require("./users_spec");
const request = (0, supertest_1.default)(server_1.default);
describe("Test orders endpoint responses", () => {
    let token;
    it("should create a user", (done) => {
        request.post("/signup").send(users_spec_1.fakeUser).then((response) => {
            expect(response.status).toBe(200);
            token = response.body;
            done();
        });
    });
    it("should gets the current endpoint", (done) => {
        request.get("/orders/1/active").set('Authorization', `Barear ${token}`).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    it("NOT gets the completed endpoint", (done) => {
        request.get("/orders/1/completed").set('Authorization', `Barear ${token}`).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    it("NOT gets the create endpoint", (done) => {
        request.post("/orders").then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    it("NOT gets the current endpoint", (done) => {
        request.get("/orders/1/active").then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    it("NOT gets the completed endpoint", (done) => {
        request.get("/orders/1/completed").then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
});
