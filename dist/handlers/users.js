"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middlewares/auth");
const store = new user_1.UserStore();
const create = async (req, res) => {
    const user = {
        id: undefined,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const authenticate = async (req, res) => {
    const user = {
        id: undefined,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    if (!(user.firstname && user.lastname && user.password)) {
        res.status(400).json("Please, give all needed informations");
        return;
    }
    try {
        const u = await store.authenticate(user.firstname, user.lastname, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401).json({ error });
    }
};
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
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
        const user = await store.show(id);
        res.json(user);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const userRoutes = (app) => {
    app.post('/signin', authenticate),
        app.post('/signup', create),
        app.get('/users', auth_1.verifyAuthToken, index),
        app.get('/users/:id', auth_1.verifyAuthToken, show);
};
exports.default = userRoutes;
