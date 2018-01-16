/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { fetchReviews } from '../review'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {allReviews: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('reviews', () => {
    it('eventually dispatches the GET REVIEWS action', () => {
      const fakeReviews = [{content: 'test1'}, {content: 'test2'}]
      mockAxios.onGet('/api/reviews').replyOnce(200, fakeReviews)
      return store.dispatch(fetchReviews())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_REVIEWS')
          expect(actions[0].reviews).to.be.deep.equal(fakeReviews)
        })
    })
  })

})
