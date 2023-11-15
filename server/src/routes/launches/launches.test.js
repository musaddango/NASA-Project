const request = require('supertest');
const { app } = require("../../app.js");

describe("Test GET /launches", ()=>{
    test("It should respond with 200 success",async ()=>{
        const response = await request(app).get('/launches');
        expect(response.status).toBe(200)
        
    });
});

describe("Test POST /launch", ()=>{

    const completeSentData = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Keplar-186 f",
        launchDate: "January 4, 2028",
    }
    const sentDataWithoutDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Keplar-186 f",
    }
    test("It should respond with 201 created", async ()=>{
        const response = await request(app)
            .post("/launches")
            .send(completeSentData)
            .expect("Content-Type",/json/)
            .expect(201);

        const responseDate = new Date(response.body.date).valueOf();
        const requestDate = new Date(completeSentData.date).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body)
        .toMatchObject(sentDataWithoutDate);
    });
    test("It should respond with 200 success",async ()=>{});
    test("It should catch Invalid launch date input",async ()=>{});
});