const request = require('supertest');
const { app } = require("../../app.js");
const { mongoseConnect, mongooseDisconnect } = require('../../services/mongo.js');
const { loadLaunchData } = require('../../models/launches.model.js');

describe("Launch Route APIs Test", ()=>{
    beforeAll(async ()=>{
        await mongoseConnect();
        await loadLaunchData();
    });

    afterAll(async ()=>{
        await mongooseDisconnect();
    });

    describe("Test /launches routes", ()=>{
        test("It should respond with 200 success", async ()=>{
            const response = await request(app).get('/v1/launches');
            expect(response.status).toBe(200)
            
        });
    });
    
    describe("Test POST /v1/launch", ()=>{
    
        const completeSentData = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-1652 b",
            launchDate: "January 4, 2028",
        }
        const sentDataWithoutDate = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-1652 b",
        }
        test("It should respond with 201 created", async ()=>{
            const response = await request(app)
                .post("/v1/launches")
                .send(completeSentData)
                .expect("Content-Type",/json/)
                .expect(201);
    
            const responseDate = new Date(response.body.date).valueOf();
            const requestDate = new Date(completeSentData.date).valueOf();
            
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(sentDataWithoutDate);
        });
    
        test("It should respond with 400 bad request",async ()=>{
            const response = await request(app)
                .post("/v1/launches")
                .send(sentDataWithoutDate)
                .expect("Content-Type",/json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: "Missing required launch property."
            });
        });
    
        test("It should catch Invalid launch date input",async ()=>{
            const response = await request(app)
                .post("/v1/launches")
                .send({...sentDataWithoutDate, launchDate: "nothing"})
                .expect("Content-Type",/json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error:"Invalid launch date input",
            })
        });
    });
})

