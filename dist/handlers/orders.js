"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const auth_1 = require("../middlewares/auth");
const store = new order_1.OrderStore();
const create = async (req, res) => {
    try {
        const order = {
            id: 0,
            user: req.body.user,
            completed: false,
            products: req.body.products
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const current = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const orders = await store.current(userId, false);
        res.json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
const completed = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const orders = await store.current(userId, true);
        res.json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
const orderRoutes = (app) => {
    app.post('/orders', auth_1.verifyAuthToken, create);
    app.get('/orders/:id/active', auth_1.verifyAuthToken, current);
    app.get('/orders/:id/completed', auth_1.verifyAuthToken, completed);
};
exports.default = orderRoutes;
