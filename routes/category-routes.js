const router = require('express').Router()
const res = require('express/lib/response');
const { Category, Product } = require('../models')

// The `/api/categories` endpoint

router.get('/categories', (req, res) => {
  // find all categories
  // be sure to include its associated 
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/categories/:id', async function (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categories = await Category.findOne({ where: { id: req.params.id }, include: [Product] })
  res.json(categories)
})

router.post('/categories', async function (req, res) => {
  // create a new category
  const categories = await Category.create(req.body)
  res.sendStatus(200)
})

router.put('/categories/:id', async function ({ params: { id } }, res) {
  // update a category by its `id` value
  const categories = await Category.update(req.body, { where: { id } })
  res.sendStatus(200)
})

router.delete('/categories/:id', async function ({ params: { id } }, res) {
  // delete a category by its `id` value
  const categories = await Category.destroy({ where: { id } })
  res.sendStatus(200)
})

module.exports = router



