const request = require('supertest');
const { app } = require("../../app.js");

describe("Test GET /launches", ()=>{
    test("It should respond with 200 success",async ()=>{
        const response = await request(app).get('/launches');
        expect(response.status).toBe(200)
        
    });
});

describe("Test POST /launch", ()=>{
    test("It should respond with 200 success", ()=>{});
    test("It should catch Missing required launch property.",()=>{});
    test("It should catch Invalid launch date input",()=>{});
})