const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', async (req, res) => {
    return res.redirect('index.html');
});

app.use(express.static('public'));

const doggoRoutes = require('./routes/doggo-routes');
app.use('/doggo', doggoRoutes);

app.listen(3000, () => console.log("Escutando em http://localhost:3000"));