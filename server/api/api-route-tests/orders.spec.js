/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const db = require("../../db");
const app = require("../../index");
const Order = db.model("order");

describe("Order routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("/api/orders/", () => {
    const testOrder = {
      id: 67,
      orderStatus: "Completed",
      orderTotal: 234, 
      userId: 3
    };

    beforeEach(() => {
      return Order.create(testOrder);
    });

    it("GET /api/orders", () => {
      return request(app)
        .get("/api/products")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body[0].id).to.be.equal(67);
        });
    });

    it("GET /api/orders/67", () => {
      return request(app)
        .get("/api/products")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body[0].name).to.be.equal("Mr Plant");
        });
    });

  });
});
