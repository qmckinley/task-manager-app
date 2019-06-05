const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

// Signup New User
test('Should signup a new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'Andrew',
    email: 'andrew@example.com',
    password: 'MyPass777!'
  }).expect(201);

// Assert that the database was changed correctly
const user = await User.findById(response.body.user._id);
expect(user).not.toBeNull();

// Assertions about the response
expect(response.body).toMatchObject({
  user: {
    name: 'Andrew',
    email: 'andrew@example.com'
  },
  token: user.tokens[0].token
});
expect(user.password).not.toBe('MyPass777!');
});

// Login Existing User
test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200);

// Validate new token is saved
const user = await User.findById(userOneId);
expect(response.body.token).toBe(user.tokens[1].token);
});

// Should Not Login Non-Existing User
test('Should not login non-existing user', async () => {
  await request(app).post('/users/login').send({
    email: 'nonexisting@example.com',
    password: 'F@k3pa55!!'
  }).expect(400);
});

// Should GET Profile For User
test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

// Should Not GET Profile For Unauthenticated User
test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

// Should DELETE Authenticated User
test('Should delete account for authenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assert that the database was changed correctly
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

// Should Not DELETE Unauthenticated User
test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

// Should Upload Avatar Image
test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

// Should PATCH Authorized User Fields
test('Should update authenticated user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Jess'
    })
    .expect(200);

  const user = await User.findById(userOneId)
  expect(user.name).toEqual('Jess');
});

// Should Not PATCH Authorized INVALID User Fields
test('Should not update authorized invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Jess'
    })
    .expect(400);
});

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated