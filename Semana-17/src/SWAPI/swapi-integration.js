const axios = require('axios');
const BASE_URL = `https://swapi.dev/api/`;

const getAllMovies = async () => {
    try {
        let response = await axios.get(BASE_URL+'films');
        console.log('getAllMovies: ',response.data);
        return response.data;
    } catch (error) {
        return null;
    }
}

const getAllCharacters = async (page=1) => {
    try {
        let response = await axios.get(BASE_URL+'people?page='+page);
        console.log('getAllCharacters: ',response.data);
        return response.data;
    } catch (error) {
        return null;
    }
}

const getCharacter = async (url) => {
    try {
        let response = await axios.get(url);
        /*console.log('getCharacter: ',response.data);*/
        return response.data;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllMovies, getAllCharacters, getCharacter };
