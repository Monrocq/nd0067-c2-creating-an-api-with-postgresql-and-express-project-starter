"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async current(id, completed) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * from orders FULL OUTER JOIN order_product ON (orders.id = order_product.order_id) WHERE completed = $2 AND user_id = ($1);";
            const result = await conn.query(sql, [id, completed]);
            let orders = [];
            conn.release();
            result.rows.forEach(row => {
                let orderExist = orders.filter(order => order.id === row.id)[0];
                if (orderExist) {
                    orders[orders.indexOf(orderExist)] = {
                        ...orderExist,
                        products: {
                            ...orderExist.products,
                            [row.product_id]: row.quantity
                        }
                    };
                }
                else {
                    orders.push({
                        id: row.id,
                        user: row.user_id,
                        completed: false,
                        products: {
                            [row.product_id]: row.quantity
                        }
                    });
                }
            });
            return orders;
        }
        catch (err) {
            throw new Error(`Cannot get user's orders : ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *;';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.user.id]);
            const id = result.rows[0].id;
            await Promise.all(Object.entries(o.products).map(async ([product, quantity]) => {
                await conn.query("INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1, $2, $3);", [id, product, quantity]);
            }));
            conn.release();
            return { ...o, id };
        }
        catch (err) {
            throw new Error(`Cannot create order : ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
