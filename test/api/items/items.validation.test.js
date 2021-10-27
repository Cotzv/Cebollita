import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payloads from "../../../src/resources/payloads.items.json";
import logger from "../../../utils/loggers";

const itemsURI = endpoints.items;
let itemByIdURI = endpoints.itemById;
let id = '';

describe('Items Validation tests', () => {
    beforeAll(() =>{
        return HttpRequestManager.makeRequest('POST', itemsURI, payloads.ItemById.POST)
        .then(function(response) {
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
            id = response.data.Id;
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 10000)

    afterAll(()=> {
        return HttpRequestManager.makeRequest('DELETE', itemByIdURI.replace('{id}', id))
        .then(function(response) {
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 10000)

    test.each `
        statusCode  | statusText    | key
        ${200}      | ${'OK'}       | ${'NegativeNumber'}
        ${200}      | ${'OK'}       | ${'DecimalNumber'}
        ${200}      | ${'OK'}       | ${'Words'}
        ${200}      | ${'OK'}       | ${'Space'}
        ${200}      | ${'OK'}       | ${'Empty'}
        ${200}      | ${'OK'}       | ${'NotExistent'}
    `('Verify that an item is updated when a PUT request "/items/{id}.json" endpoint is executed using a $key value in "Priority" variable', ({statusCode, statusText, key}) => {
        return HttpRequestManager.makeRequest('PUT', itemByIdURI.replace('{id}', id), payloads.ItemById.InvalidPriority[key])
        .then(function(response) {
            expect(response.status).toBe(statusCode);
            expect(response.statusText).toMatch(statusText);
            expect(response.data).toEqual(errors.InvalidInputData);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)

    test.each `
        statusCode  | statusText    | key
        ${200}      | ${'OK'}       | ${'NegativeNumber'}
        ${200}      | ${'OK'}       | ${'DecimalNumber'}
        ${200}      | ${'OK'}       | ${'Words'}
        ${200}      | ${'OK'}       | ${'Space'}
        ${200}      | ${'OK'}       | ${'Empty'}
        ${200}      | ${'OK'}       | ${'NotExistent'}
    `('Verify that an item is updated when a PUT request "/items/{id}.json" endpoint is executed using a $key value in "DueDate" variable', ({statusCode, statusText, key}) => {
        return HttpRequestManager.makeRequest('PUT', itemByIdURI.replace('{id}', id), payloads.ItemById.InvalidDueDate[key])
        .then(function(response) {
            expect(response.status).toBe(statusCode);
            expect(response.statusText).toMatch(statusText);
            expect(response.data).toEqual(errors.InvalidInputData);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)

    test.each `
        statusCode  | statusText    | key
        ${200}      | ${'OK'}       | ${'Null'}
        ${200}      | ${'OK'}       | ${'DecimalNumber'}
        ${200}      | ${'OK'}       | ${'Words'}
        ${200}      | ${'OK'}       | ${'Space'}
        ${200}      | ${'OK'}       | ${'Empty'}
        ${200}      | ${'OK'}       | ${'NotExistent'}
    `('Verify that an item is updated when a PUT request "/items/{id}.json" endpoint is executed using a $key value in "ParentId" variable', ({statusCode, statusText, key})=> {
        return HttpRequestManager.makeRequest('PUT', itemByIdURI.replace('{id}', id), payloads.ItemById.InvalidParentId[key])
        .then(function(response){
            expect(response.status).toBe(statusCode);
            expect(response.statusText).toBe(statusText);
            expect(response.data).toEqual(errors.InvalidParentId);
        })
        .catch(function(error){
            logger.error(error);
            throw error;
        })
    }, 200000)
})
