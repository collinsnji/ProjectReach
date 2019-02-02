import dotenv from 'dotenv'
import request from 'request';

// load the API keys
dotenv.load();
dotenv.config();

const options = {
    method: 'GET',
    url: 'https://api.aerisapi.com/observations/seattle,wa',
    qs:
    {
        client_id: process.env.AerisWeatherAccessID,
        client_secret: process.env.AerisWeatherSecretKey
    }
};

request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
});