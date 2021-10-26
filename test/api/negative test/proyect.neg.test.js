import HttpRequestManager from "../../../src/common/api/http.request.manager";
import errors from "../../../src/resources/errors.json";
import endPoints from "../../../src/resources/endpoints.json";

const projectsURI = endPoints.projects;
let projectByIdURI = endPoints.projectById;

describe("negative test", () => {
    test('Verify that has the required error with a wrong ID when  GET of a proyect the request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "GET",
            projectByIdURI.replace("{id}", "2")
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.ThereIsNoProyect);
            })
            .catch(function (error) {
                //console.log(error);
                throw error;
            });
    }, 20000);

    test('Verify that has the required error with a wrong ID when  GET of a proyect the request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "GET",
            projectByIdURI.replace("{id}", "3951526"),
            null,
            false
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.Authentication);
            })
            .catch(function (error) {
                //console.log(error);
                throw error;
            });
    }, 20000);
});
