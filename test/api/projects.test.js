import HttpRequestManager from "../../src/common/api/http.request.manager";
import endPoints from "../../src/resources/endpoints.json";
import errors from "../../src/resources/errors.json";
import payloads from "../../src/resources/payloads.json";
const projectsURI = endPoints.projects;
let projectByIdURI = endPoints.projectById;
let postId = "";
let id = "";

describe("proyect test", () => {
    beforeAll(() => {
        return HttpRequestManager.makeRequest(
            "POST",
            projectsURI,
            payloads.ProjectById.POST
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                id = response.data.Id;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    });
    afterAll(() => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            projectByIdURI.replace("{id}", postId)
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    }, 18000);

    test('Verify that 200 OK status code resutl when a GET request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest("GET", projectsURI)
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    }, 20000);

    test('Verify that 200 OK status code resutl when a POST request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "POST",
            projectsURI,
            payloads.ProjectById.POST
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                postId = response.data.Id;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    }, 20000);

    test('Verify that 200 OK status code resutl when a PUT request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            projectByIdURI.replace("{id}", id),
            payloads.ProjectById.PUT
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                postId = response.data.Id;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    }, 20000);

    test('Verify that 200 OK status code resutl when a DELETE request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            projectByIdURI.replace("{id}", id)
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                postId = response.data.Id;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    }, 20000);

    test('Verify that an error response result When a GET request "/projects.json" endpoint is executed with invalid credentials  ', () => {
        return HttpRequestManager.makeRequest("GET", projectsURI, "", false)
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).toEqual(errors.Authentication);
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    }, 20000);
});
