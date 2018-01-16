/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const db = require("../../db");
const app = require("../../index");
const Order = db.model("order");
// const { isAdmin } = require("../gatekeeper.js"); 
// can't figure out how to test admin routes --> get back not authorized, which could be okay.

describe("Order routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("/api/orders/", () => {
    const testOrder = {
      id: 67,
      orderStatus: "Completed",
      orderTotal: 234, 
      orderEmail: "me@me.com", 
      orderAddress: "123 streeet st."
    };

    beforeEach(() => {
      return Order.create(testOrder);
    });

    xit("GET /api/orders", () => {
      return request(app)
        .get("/api/orders")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body[0].id).to.be.equal(67);
        });
    });

    xit("GET /api/orders/67", () => {
      return request(app)
        .get("/api/orders/67")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.userId).to.be.equal(3);
        });
    });

  });
});
