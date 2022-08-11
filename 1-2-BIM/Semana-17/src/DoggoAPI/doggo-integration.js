const BASE_URL = 'https://dog.ceo/api/breeds/image/random';
const axios = require('axios');

const getRandomDogImg = async () => {
    try {
        let response = await axios.get(BASE_URL);
        console.log('getRandomDogImg: ',response.data);
        return response.data;
    } catch (error) {
        return null;
    }
}

module.exports = { getRandomDogImg };