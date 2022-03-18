const expresss = require('express');
const app = expresss();
const port = 3000;

const users = [
    {"id": 1, "name": "Kratos", "age": "100" }, 
    { "id": 2, "name": "Ellie", "age": "19" }, 
    { "id": 3, "name": "Nathan", "age": "33" } 
];

app.get('/', (req, res) => {    
    return res.send(`
        <h1>Server rodando!</h1>
    `);

    // const { query, params, baseUrl, path } = req;
    // <pre>
    //     QUERY: ${JSON.stringify(query, null, 2)}
    //     PARAMS: ${JSON.stringify(params, null, 2)}
    //     BASEURL: ${JSON.stringify(baseUrl, null, 2)}
    //     PATH: ${JSON.stringify(path, null, 2)}
    // </pre>
});

app.listen(port, () => {
    console.log('Server funcionando!\nRodando na porta http://localhost:3000 ...');
});

app.get('/fatorial', (req, res) => {
    const { value } = req.query;
    if(value) {
        const number = Number(value);
        if(isNaN(number)){
            return res.send('Número inválido');    
        } else {
            let fat = 1;
            for(let i = 1; i <= number; i++){
                fat *= i;
            }
            return res.send(`${number}! = ${fat}`);
        }
    }
    else res.send('Mande um número...');
});

app.get('/fat/:numero', (req, res) => {
    const { numero } = req.params;
    return res.json(`O usuário enviou request para o número ${numero}`);
});

app.get('/message/:qtd/:txt', (req, res) => {
    const { qtd, txt } = req.params;
    let response = '';
    let quant = Number(qtd);
    for(let i = 1; i <= quant; i++){
        response += txt+'<br>';
    }
    return res.send(response);
});

app.get('/envia', (req, res) => {
    const { name, age } = req.query;
    users.push({
        id: users.length+1,
        name: name,
        age: age
    });
    return res.send(`Usuario ${name} com ${age} anos`);
});

app.get('/lista', (req, res) => {
    res.send(JSON.stringify(users, null, 2));
});

app.get('/lista/:id', (req, res) => {
    const { id } = req.params;
    const user = users.filter(item => item.id == id);
    res.send(JSON.stringify(user, null, 2));
});
