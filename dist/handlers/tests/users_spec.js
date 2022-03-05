"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUser = void 0;
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
exports.fakeUser = {
    id: undefined,
    firstname: "Adel",
    lastname: "Monrocq",
    password: "password"
};
describe("Test users endpoint responses", () => {
    let token;
    it("should auth a user", (done) => {
        request.post("/signin").send(exports.fakeUser).then((response) => {
            expect(response.status).toBe(200);
            token = response.body;
            done();
        });
    });
    it("should gets the show endpoint", (done) => {
        request.get("/users/1").set('Authorization', `Barear ${token}`).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    it("should gets the index endpoint", (done) => {
        request.get("/users").set('Authorization', `Barear ${token}`).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    it("NOT gets the index endpoint", (done) => {
        request.get("/users").then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    it("NOT gets the show endpoint", (done) => {
        request.get("/users/1").then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    it("NOT create a user", (done) => {
        request.post("/signup").then((response) => {
            expect(response.status).toBe(400);
            done();
        });
    });
    it("NOT auth a user", (done) => {
        request.post("/signin").then((response) => {
            expect(response.status).toBe(400);
            done();
        });
    });
});
