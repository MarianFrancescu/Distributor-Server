require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./src/routes/router');
const router = express.Router();

const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
routes(router);

app.use(cors({
	origin: '*'
}));

app.use('/', router);

app.listen(port, () => {
    console.log("Listening on port ", port);
})