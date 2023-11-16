const request = require("supertest");
const { app } = require("../../app.js");

describe("Test /planets routes", ()=>{
    test("GET /planets should return a 200 status code",async ()=>{
        await request(app).get("/planets").expect(200);
    })
})