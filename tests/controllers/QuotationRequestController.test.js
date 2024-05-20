const request = require('supertest');
const { app, server } = require('../../index');
const { ROOT_PATH, API_KEY } = require('../../src/configs');
const { generateToken } = require('../../src/utils/jwtConfig');
const QuotationRequestService = require('../../src/services/QuotationRequestService');

const headers = {
  'Content-Type': 'application/json',
  'api-key': API_KEY,
};

const { quotationRequestTableData, userTableData } = require('../constants/index');

const tokenData = {
  id: 1,
  role: 'super_admin',
};

const tokenDataAdmin = {
  id: 1,
  role: 'otros',
};

const jestInstance = jest;
const db = require('../../src/utils/db');
const { QUOTATION_REQUESTS, USERS } = require('../../src/repositories/tables');

const truncateQuotationRequests = async () => {
  await db.raw(`TRUNCATE TABLE ${QUOTATION_REQUESTS} RESTART IDENTITY CASCADE`);
};

const truncateUsers = async () => {
  await db.raw(`TRUNCATE TABLE ${USERS} RESTART IDENTITY CASCADE`);
};

afterAll(async () => {
  server.close();
});

afterEach(async () => {
  await truncateQuotationRequests();
  await truncateUsers();
});

beforeEach(async () => {
  jestInstance.clearAllMocks();
  await db(QUOTATION_REQUESTS).insert(quotationRequestTableData);
  await db(USERS).insert(userTableData);
});

afterAll(async () => {
  await db.destroy();
});

describe('Get all quotations', () => {
  test('Should return HTTP -200- - OK', async () => {
    const page = 1;
    const limit = 10;
    const order = 'desc';
    const reference = 'COT20240319143015';
    const id = 1;
    const startDate = '2024-03-18';
    const endDate = '2024-03-19';
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const queryPagination = `page=${page}&limit=${limit}&order=${order}`;
    const queryParameters = `reference=${reference}&id=${id}&startDate=${startDate}&endDate=${endDate}`;

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotations?${queryPagination}&${queryParameters}`)
      .set(newHeaders);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  test('Should return HTTP -401- - Unauthorized', async () => {
    const response = await request(app)
      .post(`${ROOT_PATH}/quotations/get-quotations`)
      .set(headers);

    expect(response.statusCode).toBe(401);
  });

  test('Should return HTTP -401- - Role not found', async () => {
    const page = 1;
    const limit = 10;
    const order = 'desc';
    const { token } = await generateToken(tokenDataAdmin);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotations?page=${page}&limit=${limit}&order=${order}`)
      .set(newHeaders);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Error: Role not found');
  });

  test('Should return HTTP -500- - Internal Server Error', async () => {
    const errorMessage = 'Internal Server Error';
    const mockGetQuotationRequests = jestInstance.fn(() => {
      return Promise.reject(new Error(errorMessage));
    });
    QuotationRequestService.getQuotationRequests = mockGetQuotationRequests;
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotations`)
      .set(newHeaders);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
});

describe('Get quotations by user id', () => {
  test('Should return HTTP -200- - OK', async () => {
    const page = 1;
    const limit = 10;
    const order = 'desc';
    const reference = 'COT20240319143015';
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const queryPagination = `page=${page}&limit=${limit}&order=${order}`;
    const queryParameters = `reference=${reference}`;

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotations/by-user-id?${queryPagination}&${queryParameters}`)
      .set(newHeaders);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  test('Should return HTTP -401- - Unauthorized', async () => {
    const response = await request(app)
      .post(`${ROOT_PATH}/quotations/get-quotations/by-user-id`)
      .set(headers);

    expect(response.statusCode).toBe(401);
  });

  test('Should return HTTP -401- - Role not found', async () => {
    const page = 1;
    const limit = 10;
    const order = 'desc';
    const { token } = await generateToken(tokenDataAdmin);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const { userId } = tokenDataAdmin;

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotations/by-user-id/${userId}?page=${page}&limit=${limit}&order=${order}`)
      .set(newHeaders);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Error: Role not found');
  });

  test('Should return HTTP -404- - Not Found', async () => {
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .post(`${ROOT_PATH}/quotations/get-quotations/by-user-id/${tokenData.userId}`)
      .set(newHeaders)
      .set(headers);

    expect(response.statusCode).toBe(404);
  });

  test('Should return HTTP -500- - Internal Server Error', async () => {
    const errorMessage = 'Internal Server Error';
    const mockGetQuotationsByUserId = jestInstance.fn(() => {
      return Promise.reject(new Error(errorMessage));
    });
    QuotationRequestService.getQuotationRequestByUserId = mockGetQuotationsByUserId;
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotations/by-user-id`)
      .set(newHeaders);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
});

describe('Get quotation by id', () => {
  test('Should return quotation detail HTTP -200- - OK', async () => {
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotation/by-id/1`)
      .set(newHeaders);

    expect(response.status).toBe(200);
  });

  test('Should return HTTP -401- - Unauthorized', async () => {
    const response = await request(app)
      .post(`${ROOT_PATH}/quotations/get-quotation/by-id/1`)
      .set(headers);

    expect(response.statusCode).toBe(401);
  });

  test('Should return HTTP -404- - Not Found', async () => {
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotation/by-id`)
      .set(newHeaders);

    expect(response.statusCode).toBe(404);
  });

  test('Should return HTTP -500- - Internal Server Error', async () => {
    const errorMessage = 'Internal Server Error';
    const mockGetQuotationRequestById = jestInstance.fn(() => {
      return Promise.reject(new Error(errorMessage));
    });
    QuotationRequestService.getQuotationRequestById = mockGetQuotationRequestById;
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .get(`${ROOT_PATH}/quotations/get-quotation/by-id/1`)
      .set(newHeaders);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
});
