const request = require('supertest');
const { app, server } = require('../../index');
const { ROOT_PATH, API_KEY } = require('../../src/configs');
const AuthService = require('../../src/services/AuthService');
const PaginaFtResource = require('../../src/resource/PaginaFtResource');
const db = require('../../src/utils/db');

jest.mock('../../src/resource/PaginaFtResource', () => ({
  getCoUsuarioByUserAndPassword: jest.fn(),
}));

const headers = {
  'Content-Type': 'application/json',
  'api-key': API_KEY,
};

const jestInstance = jest;

const {
  fakePayloadLogin,
  fakePayloadLoginWrongPassword,
  fakeResponseGetCoUsuarioByUserAndPassword,
} = require('../constants');

const { USERS } = require('../../src/repositories/tables');

const truncateUsers = async () => {
  await db.raw(`TRUNCATE TABLE ${USERS} RESTART IDENTITY CASCADE`);
};

afterAll(async () => {
  server.close();
});

beforeEach(async () => {
  jestInstance.clearAllMocks();
  await truncateUsers();
});

describe('AuthControllerTest', () => {
  test('Shoul return HTTP -200- - OK', async () => {
    PaginaFtResource.getCoUsuarioByUserAndPassword.mockResolvedValueOnce(fakeResponseGetCoUsuarioByUserAndPassword);

    const response = await request(app)
      .post(`${ROOT_PATH}/auth/login`)
      .set(headers)
      .send(fakePayloadLogin);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
  });

  test('Should return HTTP -400- - Bad Request', async () => {
    const response = await request(app)
      .post(`${ROOT_PATH}/auth/login`)
      .set(headers)
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test('Should return HTTP -401- - Unauthorized', async () => {
    const errorMessage = 'Unauthorized';
    const mockLogin = jestInstance.fn(() => {
      return Promise.reject(new Error(errorMessage));
    });

    AuthService.login = mockLogin;

    const response = await request(app)
      .post(`${ROOT_PATH}/auth/login`)
      .set(headers)
      .send(fakePayloadLoginWrongPassword);

    const { status, body } = response;

    expect(status).toBe(401);
    expect(body.message).toBe(errorMessage);
  });

  test('Should return HTTP -500- - Internal Server Error', async () => {
    const errorMessage = 'Internal Server Error';
    const mockLogin = jestInstance.fn(() => {
      return Promise.reject(new Error(errorMessage));
    });
    AuthService.login = mockLogin;

    const response = await request(app)
      .post(`${ROOT_PATH}/auth/login`)
      .set(headers)
      .send(fakePayloadLogin);

    const { status } = response;
    const { message } = response.body;

    expect(status).toBe(500);
    expect(message).toBe(errorMessage);
  });
});
