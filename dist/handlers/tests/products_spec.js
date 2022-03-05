"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe("Test products endpoint responses", () => {
    it("gets the index endpoint", (done) => {
        request.get("/products").then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    it("gets the show endpoint", (done) => {
        request.get("/products/1").then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    it("NOT create a product without be authed", (done) => {
        request.post("/products").then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
});
