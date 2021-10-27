import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payloads from "../../../src/resources/payloads.items.json";
import logger from "../../../utils/loggers";

const itemsURI = endpoints.items;
let itemByIdURI = endpoints.itemById;
let id = '';

describe("Items Negative Tests", () =>{

    beforeAll(()=>{
        return HttpRequestManager.makeRequest('POST', itemsURI, payloads.ItemById.POST)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.data).not.toEqual(errors.Authentication)
            id = response.data.Id;
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    })

    afterAll(()=> {
        return HttpRequestManager.makeRequest('DELETE', itemByIdURI.replace('{id}', id))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    })

    test('Verify that an error response results when a GET request to “/items/{id}.json” endpoint is executed with a not exists value.', () => {
        return HttpRequestManager.makeRequest('GET', itemByIdURI.replace('{id}', 2100))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.InvalidID);
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
            expect(response.data).toEqual(errors.InvalidID);
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
            expect(response.data).toEqual(errors.InvalidID);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)

    test('Verify that an error response results when a GET request to “/items.json” endpoint is executed with invalid credentials.', () => {
        return HttpRequestManager.makeRequest('GET', itemsURI, '', false)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.Authentication);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)

    test('Verify that it doesn’t allow create an item when a POST request to “/items.json” endpoint is executed with spaces “Content” value.', () => {
        return HttpRequestManager.makeRequest('POST', itemsURI, payloads.ItemById.Negative.Spaces)
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

    test('Verify that it doesn’t allow create an item when a POST request to “/items.json” endpoint is executed with empty “Content” value.', () => {
        return HttpRequestManager.makeRequest('POST', itemsURI, payloads.ItemById.Negative.Empty)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.ShortItemName);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)

    test('Verify that an item is updated when a PUT request "/items/{id}.json" endpoint is executed using a negative value in "ParentId" variable', () => {
        return HttpRequestManager.makeRequest('PUT', itemByIdURI.replace('{id}', id), payloads.ItemById.InvalidParentId.NegativeNumber)
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

    test('Verify that an error response results when a DELETE request to “/items/{id}.json” endpoint is executed with a not existent value.', () => {
        return HttpRequestManager.makeRequest('DELETE', itemByIdURI.replace('{id}', 1))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            expect(response.data).toEqual(errors.InvalidID);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 10000)
})
