const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/token');
const {registerUser, loginUser} = require('../controllers/userController');



router.post('/register', registerUser);

router.get('/', (req,res)=>{
    res.send("Hey");
});

router.post('/login', loginUser);

module.exports = router;













// **Using Joe**

// const joe = require('joe');
// const assert = require('assert');
// const supertest = require('supertest');
// const app = require('../server'); // Import your Express app

// joe.suite('POST /create User Tests', function () {

//     joe.test('should return 400 if fullName is missing', async function () {
//         const res = await supertest(app)
//             .post('/create')
//             .send({
//                 email: 'test@example.com',
//                 password: 'password123',
//             });

//         assert.strictEqual(res.status, 400);
//         assert.strictEqual(res.body.message, 'Full name, email, and password are required');
//     });

//     joe.test('should return 400 if email is missing', async function () {
//         const res = await supertest(app)
//             .post('/create')
//             .send({
//                 fullName: 'Joe User',
//                 password: 'password123',
//             });

//         assert.strictEqual(res.status, 400);
//         assert.strictEqual(res.body.message, 'Full name, email, and password are required');
//     });

//     joe.test('should return 400 if password is missing', async function () {
//         const res = await supertest(app)
//             .post('/create')
//             .send({
//                 fullName: 'Joe User',
//                 email: 'test@example.com',
//             });

//         assert.strictEqual(res.status, 400);
//         assert.strictEqual(res.body.message, 'Full name, email, and password are required');
//     });

//     joe.test('should create a user successfully when all fields are provided', async function () {
//         const res = await supertest(app)
//             .post('/create')
//             .send({
//                 fullName: 'Joe User',
//                 email: 'test@example.com',
//                 password: 'password123',
//             });

//         assert.strictEqual(res.status, 201);
//         assert.strictEqual(res.body.fullName, 'Joe User');
//         assert.strictEqual(res.body.email, 'test@example.com');
//         assert.strictEqual(res.body.password, 'password123');  // Ideally, you'd hash the password before storing
//     });

//     joe.test('should return 500 if there is an error creating the user', async function () {
//         // You can mock the model create function here to simulate an error
//         const errorMock = {
//             create: () => {
//                 throw new Error('Database error');
//             }
//         };

//         // Replace the model temporarily for testing purposes
//         const appWithError = require('../server'); // Import app with mock
//         const res = await supertest(appWithError)
//             .post('/create')
//             .send({
//                 fullName: 'Joe User',
//                 email: 'test@example.com',
//                 password: 'password123',
//             });

//         assert.strictEqual(res.status, 500);
//         assert.strictEqual(res.body.message, 'There was an error creating the user');
//     });

// });
