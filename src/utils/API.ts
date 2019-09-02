import axios from 'axios';
import credentials from '@/utils/credentials.ts';

interface SearchWeather {
    q: string;
}
const baseUrl: string = 'http://api.openweathermap.org/data/2.5/weather';
function getWeather(payload: SearchWeather): object {
    const params: object = {
        q: payload.q,
        appid: credentials.data.weather_api_key,
    };
    return axios.get(baseUrl, {
        params,
    });
}

export default { getWeather };
