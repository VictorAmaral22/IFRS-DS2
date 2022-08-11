const express = require('express');
const axios = require('axios');


const app = express();

app.get('/', async (req, res) => {
    // pega o filme
    const numero = Math.floor(1+Math.random()*5.99);
    try {
        const responseTxt = await axios.get(`https://swapi.dev/api/films/${numero}`);
        res.json({film: responseTxt.data});
    } catch (error) {
        console.log(error);
        res.json({error: error});
    }
    
});

app.get('/filme/:id', async (req, res) => {
    // pega o filme
    const numero = Math.floor(1+Math.random()*5.99);
    const { id } = req.params;
    try {
        const responseTxt = await axios.get(`https://swapi.dev/api/films/${id}`);
        res.json({film: responseTxt.data});
    } catch (error) {
        console.log(error);
        res.json({error: error});
    }
    
});

app.listen(3000, () => console.log("Escutando em http://localhost:3000"));