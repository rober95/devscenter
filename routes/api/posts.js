const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
} = require('../../controllers/posts');

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createPost)
  .get(getPosts);

router
  .route('/:id')
  .get(getPost)
  .delete(passport.authenticate('jwt', { session: false }), deletePost);

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  likePost
);

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  unlikePost
);

module.exports = router;
