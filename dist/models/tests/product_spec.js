"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe("Product Model", () => {
    const testProduct = {
        id: 1,
        name: "Produit de test",
        price: '$10.55',
        category: null,
        url: "https://cdn.pixabay.com/photo/2017/11/30/08/56/ice-cream-2987955_1280.jpg"
    };
    beforeAll(async () => {
        const result = await store.create(testProduct);
        expect(result).toEqual(testProduct);
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('index method should return a list of product', async () => {
        const result = await store.index();
        expect(result).toEqual([testProduct]);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show(1);
        expect(result).toEqual(testProduct);
    });
});
