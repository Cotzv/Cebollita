import logger from "../../../utils/loggers";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";

const filtersURI = endpoints.Filters;
const filtersId = [0, -1, -5, -3];
let filterKeysWiki = ['Id', 'Content', 'ItemsCount', 'Icon', 'ItemType']

describe("Filters CRUD tests", () => {
    test('Verify that the response data has 3 objects when a GET request "/filters.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('GET', filtersURI.filters)
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                expect(response.data.length).toEqual(filtersId.length - 1)
            })
            .catch((error) => {
                logger.error(error);
                throw error;
            });
    });

    test('Verify that Recycle Bin object is not a Filter when a GET request "filters/-3.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest('GET', filtersURI.filtersById.replace("{id}", filtersId[3]))
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                expect(response.data).toEqual(errors.InvalidID);
            })
            .catch((error) => {
                logger.error(error);
                throw error;
            });
    });

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

})