/* globals api, expect, describe, beforeEach, afterEach, it */

require("../client/helper");

const Travel = require("../../models/travel");

describe("Travels Controller Test", () => {
  beforeEach(done => {
    Travel.create({
      budget: 5500,
      startTravelDate: new Date(),
      endTravelDate: new Date(),
      travelDuration: 7,
      country: "Japan",
      currency: "YEN",
      hotelCost: 2000,
      foodCost: 500,
      extra: 500,
      travelCost: 1800,
      transportation: 0
    })
      .then(() => done())
      .catch(done);
  });

  afterEach(done => {
    Travel.collection.remove();
    done();
  });

  describe("GET /api/travels", () => {
    it("should return a 200 response", done => {
      api
        .get("/api/travels")
        .set("Accept", "application/json")
        .expect(200, done);
    });
    it("should respond with a JSON object", done => {
      api
        .get("/api/travels")
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.header["content-type"]).to.be.eq(
            "application/json; charset=utf-8"
          );
          done();
        });
    });

    it("should return an array of travels", done => {
      api
        .get("/api/travels")
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.body).to.be.an("array");
          done();
        });
    });

    it("should return an array of travel objects", done => {
      api
        .get("/api/travels")
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.body)
            .and.be.an("array")
            .and.have.property(0)
            .and.have.all.keys([
              "__v",
              "_id",
              "budget",
              "startTravelDate",
              "endTravelDate",
              "travelDuration",
              "startTravelDate",
              "endTravelDate",
              "country",
              "hotelCost",
              "currency",
              "foodCost",
              "extra",
              "travelCost",
              "createdAt",
              "transportation",
              "updatedAt"
            ]);
          done();
        });
    });

    it("travel objects should have properties: _id, budget,startTravelDate, endTravelDate, country, hotelCost, foodCost,extra, travelCost,transportation, createdAt, updatedAt", done => {
      api
        .get("/api/travels")
        .set("Accept", "application/json")
        .end((err, res) => {
          const oneTravel = res.body[0];

          expect(oneTravel)
            .to.have.property("_id")
            .and.to.be.a("string");

          expect(oneTravel)
            .to.have.property("budget")
            .and.to.be.a("number");

          expect(oneTravel)
            .to.have.property("startTravelDate")
            .and.to.be.a("string");

          expect(oneTravel)
            .to.have.property("endTravelDate")
            .and.to.be.a("string");

          expect(oneTravel)
            .to.have.property("country")
            .and.to.be.a("string");

          expect(oneTravel)
            .to.have.property("currency")
            .and.to.be.a("string");

          expect(oneTravel)
            .to.have.property("hotelCost")
            .and.to.be.a("number");

          expect(oneTravel)
            .to.have.property("foodCost")
            .and.to.be.a("number");

          expect(oneTravel)
            .to.have.property("extra")
            .and.to.be.a("number");

          expect(oneTravel)
            .to.have.property("travelCost")
            .and.to.be.a("number");

          expect(oneTravel)
            .to.have.property("transportation")
            .and.to.be.a("number");

          expect(oneTravel)
            .to.have.property("createdAt")
            .and.to.be.a("string");

          expect(oneTravel)
            .to.have.property("updatedAt")
            .and.to.be.a("string");

          done();
        });
    });

    describe("Make more travel", () => {
      beforeEach(done => {
        Travel.create([
          {
            budget: 5500,
            startTravelDate: new Date(),
            endTravelDate: new Date(),
            travelDuration: 7,
            country: "Japan",
            currency: "YEN",
            hotelCost: 2000,
            foodCost: 500,
            extra: 500,
            travelCost: 1800,
            transportation: 0
          },
          {
            budget: 2000,
            startTravelDate: new Date(),
            endTravelDate: new Date(),
            travelDuration: 7,
            country: "France",
            currency: "EUR",
            hotelCost: 800,
            foodCost: 300,
            extra: 100,
            travelCost: 500,
            transportation: 100
          }
        ])
          .then(() => done())
          .catch(done);
      });

      it("should return three travel plan", done => {
        api
          .get("/api/travels")
          .set("Accept", "application/json")
          .end((err, res) => {
            expect(res.body.length).to.equal(3);
            done();
          });
      });
    });
  });

  describe("POST /api/travels", () => {
    it("should return a 201 response", done => {
      api
        .post("/api/travels")
        .set("Accept", "application/json")
        .send({
          travel: {
            budget: 4000,
            startTravelDate: new Date(),
            endTravelDate: new Date(),
            country: "Seattle",
            hotelCost: 1500,
            currency: "USD",
            foodCost: 300,
            extra: 100,
            travelCost: 500,
            transportation: 100,
            extra_money_for_set_week: 0
          }
        })
        .expect(201, done);
    });

    it("should create a travel", done => {
      api
        .post("/api/travels")
        .set("Accept", "application/json")
        .send({
          travel: {
            budget: 4000,
            startTravelDate: new Date(),
            endTravelDate: new Date(),
            country: "Seattle",
            hotelCost: 1500,
            currency: "USD",
            foodCost: 300,
            extra: 100,
            travelCost: 500,
            transportation: 100,
            extra_money_for_set_week: 0
          }
        })
        .end((err, res) => {
          const travel = res.body;

          expect(travel)
            .to.have.property("_id")
            .and.to.be.a("string");

          expect(travel)
            .to.have.property("budget")
            .and.to.be.a("number");

          expect(travel)
            .to.have.property("startTravelDate")
            .and.to.be.a("string");

          expect(travel)
            .to.have.property("endTravelDate")
            .and.to.be.a("string");

          expect(travel)
            .to.have.property("country")
            .and.to.be.a("string");

          expect(travel)
            .to.have.property("hotelCost")
            .and.to.be.a("number");

          expect(travel)
            .to.have.property("foodCost")
            .and.to.be.a("number");

          expect(travel)
            .to.have.property("extra")
            .and.to.be.a("number");

          expect(travel)
            .to.have.property("travelCost")
            .and.to.be.a("number");

          expect(travel)
            .to.have.property("transportation")
            .and.to.be.a("number");

          expect(travel)
            .to.have.property("createdAt")
            .and.to.be.a("string");

          expect(travel)
            .to.have.property("updatedAt")
            .and.to.be.a("string");

          done();
        });
    });
  });
});
