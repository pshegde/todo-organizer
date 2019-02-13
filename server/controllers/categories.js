'use strict'

const data = { work: ['meeting', 'server side code'], prep: ['abc'] }
module.exports = (router) => {
  router.get('/api/categories', (req, res) => {
    res.status(200).json({ data: ['work', 'prep', 'personal'] })
  })

  router.get('/api/categories/:name/items', (req, res) => {
    res.status(200).json({ data: data[req.params.name] })
  })
  return router
}