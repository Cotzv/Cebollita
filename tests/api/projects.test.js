import HttpRequestManager from '../../src/common/httpp.request.manager';
import endpointList from '../../src/resources/endpoints.json';
import payloads from '../../src/resources/payloads.json';
import errors from '../../src/resources/errors.json';

const projectsURI = endpointList.projects;
const projectByIdURI = endpointList.projectById;
let postId = '';
let id = '';

describe('Projects Tests', () => {
    beforeAll(() =>
        HttpRequestManager.makeRequest('POST', projectsURI, payloads.POST)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch('OK');
                expect(response.data).not.toEqual(errors.Authentication);
                id = response.data.Id;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            })
    );
    afterAll(() =>
        HttpRequestManager.makeRequest(
            'DELETE',
            projectByIdURI.replace('{id}', id),
            postId
        )
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch('OK');
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            })
    );
    test('Verify that a 200 OK status code when GET', () =>
        HttpRequestManager.makeRequest('GET', projectsURI)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch('OK');
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            }));

    test('Verify that a 200 OK status code when POST', () =>
        HttpRequestManager.makeRequest('POST', projectsURI, payloads.POST)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch('OK');
                expect(response.data).not.toEqual(errors.Authentication);
                postId = response.data.Id;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            }));

    test('Verify that a 200 OK status code when PUT', () =>
        HttpRequestManager.makeRequest(
            'PUT',
            projectByIdURI.replace('{id}', id),
            payloads.put
        )
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch('OK');
                expect(response.data).not.toEqual(errors.Authentication);
                postId = response.data.Id;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            }));

    test('Verify that a 200 OK status code when DELETE', () =>
        HttpRequestManager.makeRequest(
            'DELETE',
            projectByIdURI.replace('{id}', id),
            postId
        )
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch('OK');
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            }));

    test('Verify that an error response when GET', () =>
        HttpRequestManager.makeRequest('GET', projectsURI, '', false)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch('OK');
                expect(response.data).toEqual(errors.Authentication);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            }));
});
