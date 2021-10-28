import logger from "../../../utils/loggers";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payload from "../../../src/resources/payloads.json";

const filtersURI = endpoints.Filters;
const filtersId = [0, -1, -5, -3];

describe("Filters Negative tests", () => {
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
                expect(response.data).toEqual(errors.InvalidId);
            })
            .catch((error) => {
                logger.error(error);
                throw error;
            });
    }, 6000);


    test('Verify that POST request does not insert a new Filter with valid data', () => {
        return HttpRequestManager.makeRequest('POST', filtersURI.filters, payload.Filters.POST)
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                expect(response.data).toEqual(errors.NotSupportedFeature);
            })
            .catch((error) => {
                logger.error(error);
                throw error;
            });
    }, 6000);

    test('Verify that PUT request does not insert a new Filter with valid data', () => {
        return HttpRequestManager.makeRequest('PUT', filtersURI.filtersById.replace("{id}", filtersId[0]), payload.Filters.PUT)
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                expect(response.data).toEqual(errors.NotSupportedFeature);
            })
            .catch((error) => {
                logger.error(error);
                throw error;
            });
    });

    test('Verify that DELETE request does not insert a new Filter with valid data', () => {
        return HttpRequestManager.makeRequest('DELETE', filtersURI.filtersById.replace("{id}", filtersId[0]))
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                expect(response.data).toEqual(errors.NotSupportedFeature);
            })
            .catch((error) => {
                logger.error(error);
                throw error;
            });
    }, 6000);

    test('Verify that POST request does not insert a new Item in a Filter with valid data', () => {
        return HttpRequestManager.makeRequest('POST', filtersURI.filtersIdItems.replace("{id}", filtersId[0]), payload.Filters.ITEM)
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                expect(response.data).toEqual(errors.NotSupportedFeature);
            })
            .catch((error) => {
                logger.error(error);
                throw error;
            });
    }, 6000);
});
