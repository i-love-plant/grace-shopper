const {expect} = require('chai')
const db = require('../../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correct data', () => {
      let excellentReview

      beforeEach(() => {
        return Review.create({
          content: 'A Perfect Purchase',
          rating: 5
        })
          .then(review => {
            excellentReview = review
          })
      })

      it('returns the correct content', () => {
        expect(excellentReview.content).to.be.equal('A Perfect Purchase')
      })
      it('does not match incorrect content', () => {
        expect(excellentReview.description).to.not.equal('Bad Planty')
      })
      it('returns the correct rating', () => {
        expect(excellentReview.rating).to.be.equal(5)
      })
      it('does not match incorrect rating', () => {
        expect(excellentReview.price).to.not.equal(1)
      })
    })
  })
})
