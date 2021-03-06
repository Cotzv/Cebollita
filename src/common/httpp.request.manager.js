import axios from 'axios';
import instances from '../resources/instances.json';

class HttpRequestManager {
    static makeRequest(verb, uri, data = '', isAuthValid = true) {
        let instance = null;

        switch (isAuthValid) {
            case false:
                instance = axios.create(instances.InvalidCredentials);
                break;
            default:
                instance = axios.create(instances.ValidCredentials);
                break;
        }

        switch (verb) {
            case 'GET':
                return instance.get(
                    `${instance.defaults.baseURL}/api/${uri}`,
                    instance.defaults.auth
                );
            case 'POST':
                return axios.post(
                    `${instance.defaults.baseURL}/api/${uri}`,
                    data,
                    instance.defaults.auth
                );
            case 'PUT':
                return instance.post(
                    `${instance.defaults.baseURL}/api/${uri}`,
                    data,
                    instance.defaults.auth
                );
            case 'DELETE':
                return instance.delete(
                    `${instance.defaults.baseURL}/api/${uri}`,
                    instance.defaults.auth
                );
            default:
                break;
        }
    }
}

export default HttpRequestManager;
