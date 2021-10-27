import logger from "../../../utils/loggers";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";

const filtersURI = endpoints.Filters;
const filtersId = [0, -1, -5, -3];
let filterKeysWiki = ['Id', 'Content', 'ItemsCount', 'Icon', 'ItemType', 'Children'];

describe("Filters Validation tests", () => {
    test.each`
        statusCode | statusText | id
        ${200}     | ${'OK'}    | ${filtersId[0]}
        ${200}     | ${'OK'}    | ${filtersId[1]}
        ${200}     | ${'OK'}    | ${filtersId[2]}
    `(
        'Verify that the response data has fields according to the documentation when  a GET request "filters/$id.json" endpoint is executed',
        ({ statusCode, statusText, id }) => {
            return HttpRequestManager.makeRequest(
                "GET",
                filtersURI.filtersById.replace("{id}", id)
            )
                .then(function (response) {
                    expect(response.status).toBe(statusCode);
                    expect(response.statusText).toMatch(statusText);
                    expect(Object.keys(response.data)).toEqual(filterKeysWiki);

                })
                .catch(function (error) {
                    throw error;
                });
        }
    );
});
