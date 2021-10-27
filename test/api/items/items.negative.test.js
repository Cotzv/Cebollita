import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payloads from "../../../src/resources/payloads.items.json";
import logger from "../../../utils/loggers";

const itemsURI = endpoints.items;
let itemByIdURI = endpoints.itemById;

describe("Items Negative Tests", () =>{

    test('Verify that an error response results when a GET request to “/items/{id}.json” endpoint is executed with a not exists value.', () => {
        return HttpRequestManager.makeRequest('GET', itemByIdURI.replace('{id}', 2100))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.InvalidId);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)

    test('Verify that an error response results when a GET request to “/items/{id}.json” endpoint is executed with a null value.', () => {
        return HttpRequestManager.makeRequest('GET', itemByIdURI.replace('{id}', null))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.InvalidId);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)

    test('Verify that an error response results when a GET request to “/items/{id}.json” endpoint is executed with an empty value.', () => {
        return HttpRequestManager.makeRequest('GET', itemByIdURI.replace('{id}', ""))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.InvalidId);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)

    test('Verify that it doesn’t allow create an item when a POST request to “/items/{id}.json” endpoint is executed with spaces “Content” value.', () => {
        return HttpRequestManager.makeRequest('POST', payloads.ItemById.Negative.Spaces)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.InvalidInputData);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)
})
