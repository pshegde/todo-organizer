require('../helper')
//const index = require('../../server/controllers')
var app = require('../../server/index')
const supertest = require('supertest')
// const factories = require('../factories/index')
const assert = require('chai').assert

describe('categories', async () => {

  beforeEach(async () => {
    // category = await factories.category.create({})
  })

  it('should return all categories', async () => {
    let res = await supertest(app)
      .get('/api/categories')
    assert.deepEqual(res.body.data, ['work', 'prep', 'personal'])
  })

  it('should return items for category', async () => {
    let res = await supertest(app)
      .get('/api/categories/work/items')
    assert.deepEqual(res.body.data, ['meeting', 'server side code'])
  })

})


