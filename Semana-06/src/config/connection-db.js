const { Client } = require('pg');

const dbConfig = new Client({
    connectionString: 'postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h',
    ssl: {
        rejectUnauthorized: false,
    }
});

dbConfig.connect(err => {
    if(err) console.log(`Error:  ${err}`);
    else console.log("Banco conectado com sucesso!");
});


module.exports = { dbConfig };