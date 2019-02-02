import request from 'request';

const options = {
    method: 'GET',
    url: 'https://api.aerisapi.com/observations/seattle,wa',
    qs:
    {
        client_id: 'HP3fVDj7ImYVcFVMP8Own',
        client_secret: 'RKxmipYJMMJncwClnx2PGL1AqjrXbtqjcmrRDdxY'
    }
};

request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
});