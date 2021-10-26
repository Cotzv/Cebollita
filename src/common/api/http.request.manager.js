import axios from "axios";
import instances from "../../resources/instances.json";

class HttpRequestManager {
    static makeRequest(verb, uri, data = "", isAuthValid = true) {
        let instance = null;

        switch (isAuthValid) {
            case false:
                instance = axios.create(instances.invalidCredentials);
                break;
            default:
                instance = axios.create(instances.validCredentials);
                break;
        }
        switch (verb) {
            case "GET":
                return instance.get(
                    `${instance.defaults.baseUrl}/api/${uri}`,
                    instance.defaults.auth
                );
            case "POST":
                return instance.post(
                    `${instance.defaults.baseUrl}/api/${uri}`,
                    data,
                    instance.defaults.auth
                );
            case "PUT":
                return instance.put(
                    `${instance.defaults.baseUrl}/api/${uri}`,
                    data,
                    instance.defaults.auth
                );
            case "DELETE":
                return instance.delete(
                    `${instance.defaults.baseUrl}/api/${uri}`,
                    instance.defaults.auth
                );
        }
    }
}

export default HttpRequestManager;