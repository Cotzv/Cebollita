import HttpRequestManager from "../../../src/common/api/http.request.manager"
import endpoints from "../../../src/resources/endpoints.json"
import errors from '../../../src/resources/errors.user.json'
import payloads from '../../../src/resources/payloads.user.json'
import loggers from '../../../utils/loggers.js'

const userURI = endpoints.user
let userByIdURI = endpoints.userById
let id = ''

describe('User Tests', () => {
    jest.setTimeout(100000);
    beforeAll(() => {
        return HttpRequestManager.makeRequest('POST', userURI, payloads.UserById.POST)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
                id = response.data.Id
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })

    afterAll(() => {
        return HttpRequestManager.makeRequest('DELETE', userByIdURI.replace('{id}', id))
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })

    test.each`
        statusCode  | statusText    | key
        ${200}      | ${'OK'}       | ${'NegativeNumber'}
        ${200}      | ${'OK'}       | ${'DecimalNumber'}
        ${200}      | ${'OK'}       | ${'Words'}
        ${200}      | ${'OK'}       | ${'Space'}
        ${200}      | ${'OK'}       | ${'Empty'}
    `('Verify that an item is updated when a PUT request "/user/{id}.json" endpoint is executed using a $key value in "FullName" variable', ({ statusCode, statusText, key }) => {
        return HttpRequestManager.makeRequest('PUT', userByIdURI.replace('{id}', id), payloads.InvalidName[key])
            .then(function (response) {
                expect(response.status).toBe(statusCode);
                expect(response.statusText).toMatch(statusText);
                expect(response.data).toEqual(errors.InvalidInputData);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            })
    })
})
