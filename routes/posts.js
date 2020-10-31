const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = mongoose.model("posts");
const User = mongoose.model("users");
//Post Validation
const validatePostInput = require("../utilities/validation/post");
const isAuthenticated = require("../utilities/isAuthenticated");

module.exports = router => {
  // @route GET api/posts
  // @desc Fetch post
  // @access Public
  router.get("/api/posts", async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      res.status(404).json(err);
    }
  });

  // @route GET api/posts/:id
  // @desc Fetch post by Id
  // @access Public
  router.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.json(post);
    } catch (err) {
      res.status(404).json({ nopostfound: "No post found with that ID" });
    }
  });

  // @route POST api/posts
  // @desc Create post
  // @access Private
  router.post("/api/posts", isAuthenticated, async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      //IF any errors, sent 400 with errors object
      return res.status(400).json(errors);
    }
    const { text, images } = req.body;
    const newPost = new Post({
      text,
      images,
      user: req.user.id
    });

    const post = await newPost.save();
    const populatedPost = await Post.populate(post, {
      path: "user comments.user"
    });
    res.json(populatedPost);
  });

  // @route DELETE api/posts
  // @desc Delete post
  // @access Private
  router.delete("/api/posts/:id", async (req, res) => {
    try {
      const profile = await User.findOne({ user: req.user.id });
      const post = await Post.findById(req.params.id);
      //Check for post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      await post.remove();
      res.json({ success: "true" });
    } catch (error) {
      res.status(404).json({ postnotfound: "No post found" });
    }
  });

  // @route POST api/posts/like/:id
  // @desc Like post
  // @access Private
  router.post("/api/posts/like/:id", async (req, res) => {
    try {
      const profile = await User.findOne({ user: req.user.id });
      const post = await Post.findById(req.params.id);
      //Check for post owner
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res
          .status(400)
          .json({ alreadyLiked: "User already liked this post" });
      }

      //Add the user Id to likes id
      post.likes.unshift({ user: req.user.id });

      const savedPost = await post.save();
      const populatedPost = await Post.populate(savedPost, {
        path: "user comments.user"
      });
      res.json(populatedPost);
    } catch (error) {
      res.status(404).json({ postnotfound: "No post found" });
    }
  });

  // @route POST api/posts/unlike/:id //Id is the post ID
  // @desc Unlike post
  // @access Private
  router.post("/api/posts/unlike/:id", async (req, res) => {
    try {
      const profile = await User.findOne({ user: req.user.id });
      const post = await Post.findById(req.params.id);
      //Check for post owner
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        res.status(400).json({ notliked: "You have not yet liked this post" });
      }

      //Get the remove index
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

      //Splice out of array
      post.likes.splice(removeIndex, 1);

      //Save the post
      const savedPost = await post.save();
      const populatedPost = await Post.populate(savedPost, {
        path: "user comments.user"
      });
      res.json(populatedPost);
    } catch (error) {
      console.log(error);
      res.status(404).json({ postnotfound: "No post found" });
    }
  });

  // @route POST api/posts/comment/:id --id is the post Id
  // @desc Add comment to post
  // @access Private
  router.post("/api/posts/comment/:id", async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      //IF any errors, sent 400 with errors object
      return res.status(400).json(errors);
    }
    try {
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        user: req.user.id
      };
      //Add to comment array
      post.comments.unshift(newComment);
      const commentedPost = await post.save();
      const populatedPost = await Post.populate(commentedPost, {
        path: "user comments.user"
      });
      console.log(populatedPost);
      res.json(populatedPost);
    } catch (error) {
      res.status(404).json({ postnotfound: "Not post found" });
    }
  });

  // @route DELETE api/posts/comment/:id/:comment_id --id is the post Id
  // @desc Remove comment from post
  // @access Private
  router.delete("/api/posts/comment/:id/:comment_id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        res.status(404).json({ commentnotexists: "Comment does not exist" });
      }
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      post.comments.splice(removeIndex, 1);
      const newPost = await post.save();
      res.json(newPost);
    } catch (error) {
      res.status(404).json({ comment: "Comment not found" });
    }
  });

  // @route POST api/posts/find-all/skip/limit
  // @desc Fetch post (with Pagination)
  // @access Public
  router.get("/api/posts/find-all/:skip/:limit", async (req, res) => {
    try {
      const skipNumber = parseInt(req.params.skip);
      const limitNumber = parseInt(req.params.limit);
      console.log("Find all have been called", limitNumber);
      const posts = await Post.find({})
        .sort({ date: -1 })
        .skip(skipNumber)
        .limit(limitNumber)
        .populate("user")
        .populate("comments.user");

      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      res.status(400).send({ eroor: "Oops some error has occured" });
    }
  });
  // @route POST api/posts/:id/skip/limit
  // @desc Fetch post (with Pagination)
  // @access Public
  router.get("/api/posts/:id/:skip/:limit", async (req, res) => {
    try {
      const skipNumber = parseInt(req.params.skip);
      const limitNumber = parseInt(req.params.limit);
      const posts = await Post.find({ user: req.params.id })
        .sort({ date: -1 })
        .skip(skipNumber)
        .limit(limitNumber)
        .populate("user")
        .populate("comments.user");
      console.log(posts);
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      res.status(400).send({ eroor: "Oops some error has occured" });
    }
  });
};
