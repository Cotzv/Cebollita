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

    test('Verify that a 200 OK status code result when a GET request to the "/user.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('GET', userURI)
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

    test('Verify that a 200 OK status code result when a PUT request to the "/user/{id}.json" endpoint is executed', () => {
        let URI = userByIdURI.replace("{id}", id);
        return HttpRequestManager.makeRequest('PUT', URI, payloads.UserById.PUT)
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
})