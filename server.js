const express = require('express');
const app = express();
const cors = require('cors');

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
	origin: '*'
}));

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log("Listening on port ", port);
})