import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";

const filtersURI = endpoints.filters;
describe("Filters CRUD tests", () => {
	test('Verify that 200 OK status code result when a GET request "/filters.json" endpoint is executed', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI)
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				throw error;
			});
	});
});
