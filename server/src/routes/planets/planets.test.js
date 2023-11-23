const request = require("supertest");
const { app } = require("../../app.js");
const { mongoseConnect, mongooseDisconnect } = require("../../services/mongo.js");

describe("Test /planets routes", ()=>{
    beforeAll(async ()=>{
        await mongoseConnect();
    });
    afterAll(async()=>{
        await mongooseDisconnect();
    })

    test("GET /planets should return a 200 status code",async ()=>{
        await request(app).get("/planets").expect(200);
    })
})