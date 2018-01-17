/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { fetchReviews, postReview } from '../review'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'
//import { postReview } from '../index';

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {allReviews: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios) //anytime a method is called on axios, use this mockAxios instead
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('reviews', () => {
    it('eventually dispatches the GET REVIEWS action', () => {
      const fakeReviews = [{content: 'test1'}, {content: 'test2'}]
      mockAxios.onGet('/api/reviews').replyOnce(200, fakeReviews) // don't send actual get request to server, instead respond with a fake response. pretends it hit the api endpoint correctly. we dont care about api endpoint, just the store in this test
      return store.dispatch(fetchReviews()) //when you dispatch this thunk creator...
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_REVIEWS') //...this action gets dispatched
          expect(actions[0].reviews).to.be.deep.equal(fakeReviews) // and the action includes our fakeReviews array
        })
    })
  })

  it('eventually dispatches the ADD NEW REVIEW action', () => { //test that postReviews, adds a review to thes state
    const fakeReview = {content: 'test'};
    mockAxios.onPost('/api/reviews').reply(201, fakeReview)
    return store.dispatch(postReview())
      .then(() => {
        const actions = store.getActions() // may always return an array
        expect(actions[0].type).to.be.equal('ADD_NEW_REVIEW')
        expect(actions[0].review).to.be.deep.equal(fakeReview) //deep equal checks contents of objects and compares instead of checking if they ARE the same object
      })
  })

})
