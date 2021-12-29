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

router.get('/categories/:id', (req, res) => {
  // find all categories
  // be sure to include its associated 
  Category.findOne({
    where: {
      id: req.params.id
    },
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
})

router.post('/categories', (req, res) => {
  // create a new category
  Tag.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
})


router.put('/categories/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  },
    {
      catgory_name: req.body.category_name
    },
  )
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
})


router.delete('/categories/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ messsage: 'There is no category with that ID!' })
        return;
      }
      res.sendStatus(200)
    }).catch((err) => {
      // console.log(err);
      res.status(400).json(err)
    })
})

module.exports = router



