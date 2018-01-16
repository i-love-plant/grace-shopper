const {expect} = require('chai')
const db = require('../../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctData', () => {
      let cody

      beforeEach(() => {
        return Category.create({
          name: 'Cody',
          description: 'Cody is a pug'
        })
          .then(category => {
            cody = category
          })
      })

      it('returns the correct name', () => {
        expect(cody.name).to.be.equal('Cody')
      })

      it('returns the correct description', () => {
        expect(cody.description).to.be.equal('Cody is a pug')
      })
    }) // end describe('correctData')
  }) // end describe('instanceMethods')
}) // end describe('Category model')
