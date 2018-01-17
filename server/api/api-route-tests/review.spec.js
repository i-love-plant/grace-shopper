const { expect } = require("chai");
const request = require("supertest");
const db = require("../../db");
const app = require("../../index");
const Review = db.model("review");

describe("Review routes", () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });

    describe("/api/reviews/", () => {
        const excellentReview = {
            content: "Test Review",
            rating: 2
        };

        describe("GET all", () => { // describe takes 2 params, string description and function to be called
            it("responds with test review", () => {
                Review.create(excellentReview);
                return request(app)
                .get("/api/reviews") // sends get request to endpoint of app
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an("array");
                    expect(res.body[0].content).to.be.equal(excellentReview.content);
                });
            });
        });

        describe("POST review", () => {
            it("creates a review in the database", () => {
                return request(app)
                .post("/api/reviews")
                .send(excellentReview)
                .expect(201)
                .then(res => {
                    const createdReview = res.body;
                    return Review.findById(createdReview.id)
                })
                .then(foundReview => {
                    expect(foundReview.content).to.be.equal(excellentReview.content)
                })
            })
        })
    });
});
