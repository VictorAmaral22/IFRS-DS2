const axios = require('axios');

const buscaPostNaApi = async (id) => {
    const URL = `http://https://jsonplaceholder.typicode.com/posts/${id}`;

    try {
        const resposta = await axios.get(URL);

        return resposta.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { buscaPostNaApi };