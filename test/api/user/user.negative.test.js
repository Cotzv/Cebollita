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

    test('Verify that an error response result when a GET request to the "/user.json" endpoint is executed with invalid credentials', () => {
        return HttpRequestManager.makeRequest('GET', userURI, '', false)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).toEqual(errors.Authentication)
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })

    test('Verify that an error response result when a POST request to the "/user.json" endpoint is executed with invalid email address', () => {
        return HttpRequestManager.makeRequest('POST', userURI, payloads.Negative.InvalidEmail)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).toEqual(errors.InvalidEmail)
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })

    test('Verify that an error response result when a POST request to the "/user.json" endpoint is executed with an existing account', () => {
        return HttpRequestManager.makeRequest('POST', userURI, payloads.UserById.POST)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).toEqual(errors.ExistingAccount)
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })

    test('Verify that an error response result when a POST request to the "/user.json" endpoint is executed with an empty password', () => {
        return HttpRequestManager.makeRequest('POST', userURI, payloads.Negative.EmptyPassword)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).toEqual(errors.ShortPassword)
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })

    test('Verify that an error response result when a POST request to the "/user.json" endpoint is executed with an empty fullname', () => {
        return HttpRequestManager.makeRequest('POST', userURI, payloads.Negative.EmptyName)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).toEqual(errors.InvalidName)
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })
})