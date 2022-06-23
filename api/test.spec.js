//import request from './node_modules/';
// import DotEnv from 'dotenv'
// import axios from 'axios'
// import jwt from 'jsonwebtoken'
// import querystring from 'querystring';
// import crypto from 'crypto'
// DotEnv.config()
var axios = require("axios");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const querystring = require("querystring")
dotenv.config();
//const { axios } = axios;

let jwtSecretKey = process.env.SECRET_TOKEN;
let data = { time: Date(),  userId: 12 }
const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1d' });        
console.log(token)

// Logout a token
var Logout = 'http://127.0.0.1:8083/api/user/logout' 
describe("Logout",  function() {
    describe(Logout,  function() {
        it("Status code 200", async function() 
        {
            let jwtSecretKey = process.env.SECRET_TOKEN;
            let data = { time: Date(),  userId: 12 }
            const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1d' });        
            var header = {  'Authorization': 'Bearer ' + token };

            axios.post(Logout, header).then(response => {
                expect(response.statusCode).toBe(200);
            });
        });
    })
});

// Register User/
var RegisterUser = 'http://127.0.0.1:8083/api/user/register' 

describe("Register",  function() {
    describe(RegisterUser,  function() {
        it("User Created", async function() 
        {
            var form =
            {
                  firstname: "Loris",
                  lastname: "Boyer",
                  email: "loris.boyer@epitech",
                  password: "1234567AZE",
                  language: "FR",
                  country: "FR",
                  city: "Saint-Jeannet",
                  zipcode: "06640",
                  level_in_YOUR_language: 1,
                  mother_language: "FR",
                  credit_card: "1234 1234 1234 1234 343",
                  age: 21,
                  birth: "2000-08-09",
                  created_at: "2022-05-21",
                  updated_at: "2022-05-21"
            }       
            var formData = querystring.stringify(form);
            axios.post(RegisterUser, formData).then(response => {
                expect(response.statusCode).toBe(201);
            });
        })
    })
});

// Update User
var UpdateUser = 'http://127.0.0.1:8083/api/user/6288a1fb86327f546f78ea5f' 

describe("Update",  function() {
    describe(UpdateUser,  function() {
        it("User Updated", async function() 
        {
            let jwtSecretKey = process.env.SECRET_TOKEN;
            let data = { time: Date(),  userId: 12 }
            const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1d' });        
            var header = {  'Authorization': 'Bearer ' + token };

            var form = {
                firstname: 'loris',
                lastname: 'boyer'
            };        
            var formData = querystring.stringify(form);
            axios.put(UpdateUser, formData, header).then(response => {
                expect(response.statusCode).toBe(201);
            });
        })
    })
});

// ChangePass User
var ChangePassUser = 'http://127.0.0.1:8083/api/user/changepass/6288a1fb86327f546f78ea5f' 

describe("ChangePass",  function() {
    describe(ChangePassUser,  function() {
        it("PasswordChange", async function() 
        {
            let jwtSecretKey = process.env.SECRET_TOKEN;
            let data = { time: Date(),  userId: 12 }
            const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1d' });        
            var header = {  'Authorization': 'Bearer ' + token };

            const password = '123456';
            const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
            var form = {
                password: hashedPassword,
            }
            var formData = querystring.stringify(form);
            axios.put(ChangePassUser, formData, header).then(response => {
                expect(response.status).toBe(201);
            });
        })
    })
});

// Login a user
var LoginUser = 'http://127.0.0.1:8083/api/user/login' 

describe("Login",  function() {
    describe(LoginUser,  function() {
        it("User Logged", async function() 
        {   
            const password = '123456';
            const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
            var form = {
                email: 'loris.boyer@epitech.eu',
                password: hashedPassword,
            }
            var formData = querystring.stringify(form);
            axios.post(LoginUser,formData).then(response => {
                expect(response.statusCode).toBe(200);
            });
        })
    })
});

// GetUser
var GetUser = 'http://127.0.0.1:8083/api/user/6288a1fb86327f546f78ea5f' 

describe("Get User",  function() {
    describe(GetUser,  function() {
        it("Get Logged", async function() 
        {
            let jwtSecretKey = process.env.SECRET_TOKEN;
            let data = { time: Date(),  userId: 12 }
            const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1d' });        
            var header = {  'Authorization': 'Bearer ' + token };

            axios.get(GetUser, header).then(response => {
                expect(response.status).toBe(200);
            });
        })
    })
});

// GetUser
var GetAll = 'http://127.0.0.1:8083/api/user/' 

describe("Get User",  function() {
    describe(GetAll,  function() {
        it("Get All", async function() 
        {
            let jwtSecretKey = process.env.SECRET_TOKEN;
            let data = { time: Date(),  userId: 12 }
            const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1d' });        
            var header = {  'Authorization': 'Bearer ' + token };

            axios.get(GetAll, header).then(response => {
                expect(response.statusCode).toBe(200);
            });
        })
    })
});