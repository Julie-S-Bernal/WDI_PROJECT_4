/* global api, describe, it, expect, before, after, afterEach, should */
require("../client/helper");

const jwt = require("jsonwebtoken");
const { secret } = require("../../config/environment");
const Travel = require("../../models/travel");
const User = require("../../models/user");

const userData = [
  {
    email: "test@test.com",
    password: "test"
  }
];

describe("POST /api/register", () => {
  after(done => {
    User.remove(done);
  });
  it("secret should not be null", done => {
    should.exist(secret);
  });

  it("should return a 422 response with incorrect details", done => {
    api
      .post("/api/register")
      .set("Accept", "application/json")
      .send({ email: "bad", password: "bad" })
      .expect(422, done);
  });

  it("should return a 200 response", done => {
    api
      .post("/api/register")
      .set("Accept", "application/json")
      .send(userData[0])
      .expect(200, done);
  });

  it("should return an object", done => {
    api
      .post("/api/register")
      .set("Accept", "application/json")
      .send(userData[0])
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should create a user object", done => {
    api
      .post("/api/register")
      .set("Accept", "application/json")
      .send(userData[0])
      .end(() => {
        User.findOne({ email: userData[0].email }, (err, user) => {
          expect(user).to.be.an("object");
          expect(user.username).to.equal(userData[0].username);
          expect(user.email).to.equal(userData[0].email);
          done();
        });
      });
  });
});

const travel = [
  {
    budget: "2000",
    startTravelDate: "01-12-2017",
    endTravelDate: "14-01-2017",
    travelDuration: "5",
    country: "Norway",
    currency: "NOK",
    hotelCost: "800",
    foodCost: "500",
    extra: "500",
    travelCost: "1200",
    transportation: "100"
  },
  {
    budget: "7000",
    startTravelDate: "01-12-2017",
    endTravelDate: "15-03-2017",
    travelDuration: "5",
    country: "Sweden",
    currency: "SEK",
    hotelCost: "4000",
    foodCost: "500",
    extra: "500",
    travelCost: "800",
    transportation: "100"
  }
];

describe("POST /api/travels", () => {
  let token = null;

  before(done => {
    User.create(
      {
        name: "test",
        surname: "test",
        email: "test@test.com",
        password: "test"
      },
      (err, user) => {
        token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1hr" });
        done(err);
      }
    );
  });

  after(done => {
    User.remove(done);
  });

  afterEach(done => {
    Travel.remove(done);
  });

  it("should return a 401 response", done => {
    api
      .post("/api/travels")
      .set("Accept", "application/json")
      .send(travel[0])
      .expect(401, done);
  });

  it("should return a 201 response with a token", done => {
    api
      .post("/api/travels")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(travel[0])
      .expect(201, done);
  });

  it("should return an object", done => {
    api
      .post("/api/travels")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(travel[0])
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return the correct data", done => {
    api
      .post("/api/travels")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(travel[0])
      .end((err, res) => {
        const traveldetails = res.body;
        expect(traveldetails.id).to.be.a("string");
        expect(traveldetails.budget).to.equal(travel[0].budget);
        expect(traveldetails.country).to.equal(travel[0].country);
        expect(traveldetails.startTravelDate).to.equal(
          travel[0].startTravelDate
        );
        expect(traveldetails.endTravelDate).to.equal(travel[0].endTravelDate);
        expect(traveldetails.currency).to.equal(travel[0].curency);
        expect(traveldetails.travelDuration).to.equal(travel[0].travelDuration);
        expect(traveldetails.hotelCost).to.equal(travel[0].hotelCost);
        expect(traveldetails.travelCost).to.equal(travel[0].travelCost);
        expect(traveldetails.extra).to.equal(travel[0].extra);
        expect(traveldetails.foodCost).to.equal(travel[0].foodCost);
        expect(traveldetails.transportation).to.equal(travel[0].transportation);
        done();
      });
  });
});
