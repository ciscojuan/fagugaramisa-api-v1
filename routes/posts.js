const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const mongoose = require('mongoose');

//get
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('category');
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// get post by Actividades category
router.get('/category/actividades', async (req, res) => {
  try {
    const posts = await Post.find().populate('category');
    const actividadesPosts = posts.filter(
      (post) => post.category && post.category.name === 'actividades'
    );
    res.json(actividadesPosts);
  } catch (err) {
    res.json({ message: err });
  }
});

// get post by Actividades category
router.get('/category/noticias', async (req, res) => {
  try {
    const posts = await Post.find().populate('category');
    const actividadesPosts = posts.filter(
      (post) => post.category && post.category.name === 'noticias'
    );
    res.json(actividadesPosts);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get a post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// write a post method
router.post('/', async (req, res) => {
  if (!mongoose.isValidObjectId(req.body.category)) {
    res.status(400).json({ message: 'Invalid category id' });
  }

  let post = new Post({
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
    category: req.body.category,
  });

  try {
    post = await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
//update
router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ message: 'Invalid post id' });
  }

  if (!mongoose.isValidObjectId(req.body.category)) {
    res.status(400).json({ message: 'Invalid category id' });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
//delete
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.json(post);
  } catch (err) {
    console.error({ message: err });
  }
});

module.exports = router;
