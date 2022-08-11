// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h

const {
    dbConfig
} = require("../config/connection-db");

class Filme {
    constructor(id, nome, genero, sinopse, lancamento) {
        this.id = id;
        this.nome = nome;
        this.genero = genero;
        this.sinopse = sinopse;
        this.lancamento = lancamento;
    }
}

class FilmeDAO {
    static async insereFilme(filme) {
        const sql = 'INSERT INTO public.filmes (nome, genero, sinopse, data_lancamento) VALUES ($1, $2, $3, $4);';
        const values = [filme.nome, filme.genero, filme.sinopse, filme.data_lancamento];

        try {
            await dbConfig.query(sql, values);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async detalharFilme(id) {
        const sql = 'SELECT * FROM public.filmes WHERE id = $1';
        const values = [id];

        try {
            const res = await dbConfig.query(sql, values);
            return res.rows[0];
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async alterarFilme(id, nome, genero, sinopse, data_lancamento) {
        const sql = 'UPDATE public.filmes SET nome = $2, genero = $3, sinopse = $4, data_lancamento = $5 WHERE id = $1';
        const values = [id, nome, genero, sinopse, data_lancamento];

        try {
            await dbConfig.query(sql, values);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async deletarFilme(id) {
        const sql = 'DELETE from public.filmes WHERE id = $1';
        const values = [id];

        try {
            await dbConfig.query(sql, values);
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}

module.exports = {
    Filme,
    FilmeDAO
};