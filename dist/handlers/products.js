"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const auth_1 = require("../middlewares/auth");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const show = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json("Please fill an integer as ID");
        return;
    }
    try {
        const product = await store.show(id);
        res.json(product);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            id: 0,
            name: req.body.name,
            price: req.body.price,
            url: req.body.url
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', auth_1.verifyAuthToken, create);
};
exports.default = productRoutes;
