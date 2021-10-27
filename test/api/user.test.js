import HttpRequestManager from "../../src/common/api/http.request.manager"
import endpoints from "../../src/resources/endpoints.json"
import errors from '../../src/resources/errors.json'
import payloads from '../../src/resources/payloads.json'
import loggers from '../../utils/loggers.js'

const userURI = endpoints.user
let userByIdURI = endpoints.userById
let id = ''
let postId = ''

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
        return HttpRequestManager.makeRequest('DELETE', userByIdURI.replace('{id}', postId))
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

    test('Verify that a 200 OK status code result when a POST request to the "/user.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('POST', userURI, payloads.UserById.POST)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
                postId = response.data.Id
            })
            .catch(function (error) {
                loggers.error(error)
                throw error
            })
    })

    test('Verify that a 200 OK status code result when a PUT request to the "/user/{id}.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('PUT', userByIdURI.replace('{id}', id), payloads.UserById.PUT)
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

    test('Verify that a 200 OK status code result when a DELETE request to the "/user/{id}.json" endpoint is executed', () => {
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
    test('Verify that an error response result when a GET request to the "/user.json" endpoint is executed with invalid email address', () => {
        return HttpRequestManager.makeRequest('GET', userURI, '', false)
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
    test('Verify that an error response result when a GET request to the "/user.json" endpoint is executed with invalid email address', () => {
        return HttpRequestManager.makeRequest('GET', userURI, '', false)
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
})