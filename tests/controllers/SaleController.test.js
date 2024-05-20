const request = require('supertest');
const { app, server } = require('../../index');
const { ROOT_PATH, API_KEY } = require('../../src/configs');
const { generateToken } = require('../../src/utils/jwtConfig');
const SaleService = require('../../src/services/SaleService');
const PaginaFtResource = require('../../src/resource/PaginaFtResource');

jest.mock('../../src/resource/PaginaFtResource', () => ({
  createSalesByQuotationRequest: jest.fn(),
}));

const headers = {
  'Content-Type': 'application/json',
  'api-key': API_KEY,
};

const { quotationRequestTableData, userTableData } = require('../constants/index');

const tokenData = {
  id: 1,
  role: 'distribuidor',
};

const jestInstance = jest;
const db = require('../../src/utils/db');
const { QUOTATION_REQUESTS, USERS, SALES } = require('../../src/repositories/tables');

const truncateQuotationRequests = async () => {
  await db.raw(`TRUNCATE TABLE ${QUOTATION_REQUESTS} RESTART IDENTITY CASCADE`);
};

const truncateUsers = async () => {
  await db.raw(`TRUNCATE TABLE ${USERS} RESTART IDENTITY CASCADE`);
};

const truncateSales = async () => {
  await db.raw(`TRUNCATE TABLE ${SALES} RESTART IDENTITY CASCADE`);
};

afterAll(async () => {
  server.close();
});

afterEach(async () => {
  await truncateQuotationRequests();
  await truncateUsers();
  await truncateSales();
});

beforeEach(async () => {
  jestInstance.clearAllMocks();
  await db(QUOTATION_REQUESTS).insert(quotationRequestTableData);
  await db(USERS).insert(userTableData);
});

afterAll(async () => {
  await db.destroy();
});

describe('create sale from quotation request', () => {
  test('Should return HTTP -201- - Created', async () => {
    const { token } = await generateToken(tokenData);
    PaginaFtResource.createSalesByQuotationRequest.mockResolvedValueOnce({ token: 'kndslkjfkjalkjdl' });

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .post(`${ROOT_PATH}/sales/create-sale`)
      .set(newHeaders)
      .send({ id: 1 });

    expect(response.statusCode).toBe(201);
  });

  test('Shoul return HTTP -400- - Bad Request', async () => {
    const errorMessage = 'Faltan campos obligatorios';
    const { token } = await generateToken(tokenData);
    const newHeaders = { ...headers, Authorization: token };

    const response = await request(app)
      .post(`${ROOT_PATH}/sales/create-sale`)
      .set(newHeaders)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(errorMessage);
  });

  test('should return HTTP -401- - Unauthorized', async () => {
    const errorMessage = 'Acceso no autorizado';

    const response = await request(app)
      .post(`${ROOT_PATH}/sales/create-sale`)
      .set(headers)
      .send({ id: 1 });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(errorMessage);
  });

  test('Should return HTTP -404- - Not Found', async () => {
    const errorMessage = 'No se encontró la cotización';
    const { token } = await generateToken(tokenData);
    const newHeaders = { ...headers, Authorization: token };

    const response = await request(app)
      .post(`${ROOT_PATH}/sales/create-sale`)
      .set(newHeaders)
      .send({ id: 100 });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(errorMessage);
  });

  test('Should return HTTP -500- - Internal Server Error', async () => {
    const errorMessage = 'Internal Server Error';
    const mockCreateSalesByQuotationRequest = jestInstance.fn(() => {
      return Promise.reject(new Error(errorMessage));
    });
    SaleService.createSale = mockCreateSalesByQuotationRequest;
    const { token } = await generateToken(tokenData);

    const newHeaders = {
      ...headers,
      Authorization: token,
    };

    const response = await request(app)
      .post(`${ROOT_PATH}/sales/create-sale`)
      .set(newHeaders)
      .send({ id: 1 });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
});
