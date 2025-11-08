// API Test: Users endpoint
import { API_ENDPOINTS, TEST_USERS } from '../../support/constants';

describe('Users API Tests', () => {
  let authToken;

  before(() => {
    // Login to get auth token
    cy.request({
      method: 'POST',
      url: API_ENDPOINTS.LOGIN,
      body: TEST_USERS.ADMIN
    }).then((response) => {
      authToken = response.body.token;
    });
  });

  it('should get list of users', () => {
    cy.request({
      method: 'GET',
      url: API_ENDPOINTS.USERS,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('users');
      expect(response.body.users).to.be.an('array');
    });
  });

  it('should create a new user', () => {
    cy.request({
      method: 'POST',
      url: API_ENDPOINTS.USERS,
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
    });
  });
});

