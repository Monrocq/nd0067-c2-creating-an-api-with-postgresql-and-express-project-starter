"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testOrder = void 0;
const order_1 = require("../order");
const user_spec_1 = require("./user_spec");
const store = new order_1.OrderStore();
exports.testOrder = {
    id: 1,
    completed: false,
    user: user_spec_1.testUser,
    products: new Map([
        [1, 3]
    ])
};
describe("Order Model", () => {
    it("should create an order", async () => {
        const result = await store.create(exports.testOrder);
        expect(result).toEqual(result);
    });
    it("should get the completed orders", async () => {
        const result = await store.current(exports.testOrder.id, true);
        expect(result).toEqual([]);
    });
    it("should get the current orders", async () => {
        const result = await store.current(exports.testOrder.user.id, false);
        expect(result[0].id).toEqual(exports.testOrder.id);
    });
});
