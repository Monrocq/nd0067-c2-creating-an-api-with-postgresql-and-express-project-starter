import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';

const app: express.Application = express()
const address: string = "localhost:8080"
var port = process.env.PORT || 8080;

const corsOptions = {
    origin: 'http://localhost', //White list
    optionsSuccessStatus: 200
}

app.use(cors());
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/test-cors', function (req, res) {
    res.json({msg: "This is CORS-enabled with a middle ware"})
})

productRoutes(app)
userRoutes(app)
orderRoutes(app)

app.listen(port, function () {
    console.log(`starting app on port: ${port}`)
})

export default app;