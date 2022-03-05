"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUser = void 0;
const user_1 = require("../user");
const store = new user_1.UserStore();
exports.testUser = {
    id: 3,
    firstname: "Adel",
    lastname: "Malik",
    password: "password",
};
describe("User Model", () => {
    let password_digest;
    beforeAll(async () => {
        const result = await store.create(exports.testUser);
        expect(result.firstname).toEqual(exports.testUser.firstname);
        expect(result.lastname).toEqual(exports.testUser.lastname);
        password_digest = result.password_digest;
    });
    it('should have an signup method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an signin method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should authenticate the user created', async () => {
        const result = await store.authenticate(exports.testUser.firstname, exports.testUser.lastname, exports.testUser.password);
        expect(result).not.toBeNull();
    });
    it('should get all users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    afterAll(async () => {
        const result1 = await store.index();
        const result = await store.show(3);
        expect(result.password_digest).toEqual(password_digest);
    });
});
