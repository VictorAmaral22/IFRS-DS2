const BASE_URL = 'https://api.agify.io';
const axios = require('axios');

const getAge = async (name) => {
    try {
        let response = await axios.get(BASE_URL+'?name='+name);
        console.log('getAge: ',response.data);
        return response.data;
    } catch (error) {
        return null;
    }
}

module.exports = { getAge };