/* global describe beforeEach it */

import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NewReviewEntry } from "../NewReviewEntry";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("NewReviewEntry", () => {
  let reviews;

  beforeEach(() => {
    let review = {
      id: 1,
      content: "Super Duper Plant",
      rating: 5,
      createdAt: "2018-01-15T02:22:20.626Z",
      updatedAt: "2018-01-15T02:22:20.626Z",
      userId: 2,
      productId: 3,
      products: [
        {
          id: 1,
          name: "Planty",
          description: "Plantify Your Life",
          image: "https://i.imgur.com/pBjJBKK.jpg",
          price: 5,
          inventory: 26,
          createdAt: "2018-01-15T02:22:20.684Z",
          updatedAt: "2018-01-15T02:22:20.684Z",
          userId: 1,
          productId: 1
        }
      ]
    };
    reviews = shallow(<NewReviewEntry reviewData={review} />);
  });

  xit("renders the title in an h1", () => {
    expect(reviews.find("li").text()).to.be.equal("Super Duper Plant");
  });
});
