const express = require('express');
const Category = require('../models/category');
const router = express.Router();

//get categories
router.get('/', async (req, res) => {
  const categories = await Category.find();

  if(!categories) {
    res.status(500).json({message : 'There is no categories.'})
  }
  res.status(200).json(categories);
})

// get category names for crarNoticia Form
router.get('/names', async (req, res) => {

    const names = await Category.find().select('name _ id');
    res.status(200).json(names);
})
module.exports = router;
