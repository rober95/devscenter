const asyncHandler = require('../middleware/async');

// Load Model
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// Validation
const validatePostInput = require('../validation/post');

// @route   GET api/posts
// @desc    Get posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  if (!posts) return res.status(404).json({ nopostsfound: 'No posts found' });

  res.json(posts);
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({ nopostfound: 'No post found with that ID' });

  res.json(post);
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id,
    avatar: req.body.avatar,
  });

  const post = await newPost.save();

  res.status(201).json(post);
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(401).json({ postnotfound: 'No post found' });

  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ notauthorized: 'User not authorized' });
  }

  // Delete
  await post.remove();

  res.json({ success: true });
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
exports.likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(401).json({ postnotfound: 'No post found' });

  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length > 0
  ) {
    return res
      .status(400)
      .json({ alreadyliked: 'User already liked this post' });
  }

  // Add user id to likes array
  post.likes.unshift({ user: req.user.id });

  await post.save();

  res.json(post);
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
exports.unlikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(401).json({ postnotfound: 'No post found' });

  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length === 0
  ) {
    return res
      .status(400)
      .json({ notliked: 'You have not yet liked this post' });
  }

  // Get remove index
  const removeIndex = post.likes
    .map(item => item.user.toString())
    .indexOf(req.user.id);

  // Splice out of array
  post.likes.splice(removeIndex, 1);

  await post.save();

  res.json(post);
});
