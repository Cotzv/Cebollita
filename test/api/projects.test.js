import HttpRequestManager from "../../src/common/api/http.request.manager"
import endpoints from "../../src/resources/endpoints.json"
import errors from '../../src/resources/errors.json'
import payloads from '../../src/resources/payloads.json'
import loggers from '../../utils/loggers.js'

const projectsURI = endpoints.projects
let projectByIdURI = endpoints.projectById
let id = ''
let postId = ''

describe('Projects Tests', () => {
    jest.setTimeout(100000);
    beforeAll(() => {
        return HttpRequestManager.makeRequest('POST', projectsURI, payloads.ProjectById.POST)
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
        return HttpRequestManager.makeRequest('DELETE', projectByIdURI.replace('{id}', postId))
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
            })
            .catch(function (error) {
                console.log(error)
                throw error
            })
    })

    test('Verify that a 200 OK status code result when a GET request to the "/projects.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('GET', projectsURI)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
            })
            .catch(function (error) {
                console.log(error)
                throw error
            })
    })

    test('Verify that a 200 OK status code result when a POST request to the "/projects.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('POST', projectsURI, payloads.ProjectById.POST)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
                postId = response.data.Id
            })
            .catch(function (error) {
                console.log(error)
                throw error
            })
    })

    test('Verify that a 200 OK status code result when a PUT request to the "/projects/{id}.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('PUT', projectByIdURI.replace('{id}', id), payloads.ProjectById.PUT)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
            })
            .catch(function (error) {
                console.log(error)
                throw error
            })
    })

    test('Verify that a 200 OK status code result when a DELETE request to the "/projects/{id}.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('DELETE', projectByIdURI.replace('{id}', id))
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).not.toEqual(errors.Authentication)
            })
            .catch(function (error) {
                console.log(error)
                throw error
            })
    })

    test('Verify that an error response result when a GET request to the "/projects.json" endpoint is executed with invalid credentials', () => {
        return HttpRequestManager.makeRequest('GET', projectsURI, '', false)
            .then(function (response) {
                expect(response.status).toBe(200)
                expect(response.statusText).toMatch('OK')
                expect(response.data).toEqual(errors.Authentication)
            })
            .catch(function (error) {
                console.log(error)
                throw error
            })
    })
})