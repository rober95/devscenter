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
  createComment,
  deleteComment,
} = require('../../controllers/posts');

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

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  createComment
);

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  deleteComment
);

module.exports = router;
