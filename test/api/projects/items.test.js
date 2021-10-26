import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endPoints from "../../../src/resources/endpoints.json";
import payloads from "../../../src/resources/errors.json";
import errors from "../../../src/resources/payloads.json";
import loggers from "../../../utils/loggers";

let projectByIdURI = endPoints.projectById;
let id = "";
const projectsURI = endPoints.projects;
describe("Projects - Edit Tests", () => {
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
                loggers.error(error);
                //console.log(error);
                throw error;
            });
    }, 20000);

    afterAll(() => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            projectByIdURI.replace("{id}", id)
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                //console.log(error);
                throw error;
            });
    }, 20000);

    test.skip.each([
        [200, "OK", "NegativeNumber"],

        [(200, "OK", "DecimalNumber")],

        [200, "OK", "Words"],

        [200, "OK", "AlphaNumeric"],

        [200, "OK", "Empty"]
    ])(
        'Verify that %i %s status code with error message result when a PUT request to the "/projects/{id}.json"endpoint is executed using an invalid request',
        (statusCode, statusText, key) => {
            return HttpRequestManager.makeRequest(
                "PUT",
                projectByIdURI.replace("{id}", id),
                payloads.ProjectById.Invalid[key]
            )
                .then(function (response) {
                    expect(response.status).toBe(statusCode);
                    expect(response.statusText).toMatch(statusText);
                    expect(response.data).toEqual(errors.InvalidInputData);
                })
                .catch(function (error) {
                    // console.log(error);
                    loggers.error(error);
                    throw error;
                });
        },
        20000
    );

    test.each`
        statusCode | statusText | key
        ${200}     | ${"OK"}    | ${"NegativeNumber"}
        ${200}     | ${"OK"}    | ${"DecimalNumber"}
        ${200}     | ${"OK"}    | ${"Words"}
        ${200}     | ${"OK"}    | ${"AlphaNumeric"}
        ${200}     | ${"OK"}    | ${"Empty"}
    `(
        'Verify that %i %s status code with error message result when a PUT request to the "/projects/{id}.json"endpoint is executed using an invalid request',
        ({ statusCode, statusText, key }) => {
            return HttpRequestManager.makeRequest(
                "PUT",
                projectByIdURI.replace("{id}", id),
                payloads.ProjectById.Invalid[key]
            )
                .then(function (response) {
                    expect(response.status).toBe(statusCode);
                    expect(response.statusText).toMatch(statusText);
                    expect(response.data).toEqual(errors.InvalidInputData);
                })
                .catch(function (error) {
                    // console.log(error);
                    loggers.error(error);
                    throw error;
                });
        }
    );
});