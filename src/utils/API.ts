import axios from 'axios';
import credentials from '@/utils/credentials.ts';

interface payload {
    [propName: string]: any;
}
const base_url: string = 'http://api.openweathermap.org/data/2.5/weather';
function GET(payload: payload): object {
    const params: object = {
        q: payload.q,
        appid: credentials.data.weather_api_key,
    };
    return axios.get(base_url, {
        params,
    });
}

export default { GET };
