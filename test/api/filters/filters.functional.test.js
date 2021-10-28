import logger from "../../../utils/loggers";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";

const filtersURI = endpoints.Filters;
const filtersId = [0, -1, -5, -3]

describe("Filters CRUD tests", () => {
	test('Verify that 200 OK status code result when a GET request "/filters.json" endpoint is executed', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filters)
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	});

	test('Verify that a 200 OK status code results when a GET by ID request to "/filters/0.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersById.replace("{id}", filtersId[0]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 5000);

	test('Verify that a 200 OK status code results when a GET by ID request to "/filters/-1.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersById.replace("{id}", filtersId[1]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 5000);

	test('Verify that a 200 OK status code results when a GET by ID request to "/filters/-5.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersById.replace("{id}", filtersId[2]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 5000);

	test('Verify that a 200 OK status code results when a GET items of a filter request to "filters/0/items.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersIdItems.replace("{id}", filtersId[0]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 5000);

	test('Verify that a 200 OK status code results when a GET items of a filter request to "filters/-1/items.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersIdItems.replace("{id}", filtersId[1]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 5000);

	test('Verify that a 200 OK status code results when a GET items of a filter request to "filters/-5/items.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersIdItems.replace("{id}", filtersId[2]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 6000);

	test('Verify that a 200 OK status code results when a GET done items of a filter request to "filters/0/doneitems.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersIdDoneItems.replace("{id}", filtersId[0]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 5000);

	test('Verify that a 200 OK status code results when a GET done items of a filter request to "filters/-1/doneitems.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersIdDoneItems.replace("{id}", filtersId[1]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 6000);

	test('Verify that a 200 OK status code results when a GET done items of a filter request to "filters/-5/doneitems.json" endpoint is executed.', () => {
		return HttpRequestManager.makeRequest('GET', filtersURI.filtersIdDoneItems.replace("{id}", filtersId[2]))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.statusText).toMatch("OK");
				expect(response.data).not.toEqual(errors.Authentication);
			})
			.catch((error) => {
				logger.error(error);
				throw error;
			});
	}, 5000);
});
