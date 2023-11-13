const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Post = require("../models/postSchema");

router.route('/CreatePost').post((req, res) => {
    const { title, description, user, img } = req.body;
    console.log(img)
    const newPost = new Post({
      title,
      description,
      user,
      img,
    });

    
  
    newPost.save()
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error creating post');
      });
  });

  router.route('/getPost').get(async (req, res) => {
    try {
      const blogs = await Post.find(); 
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.route('/getAuthors').get(async (req, res) => {
    try {
        const blogs = await Post.find();
        const authorKeys = blogs.map(blog => blog.user.key);
        const uniqueAuthors = authorKeys.filter((author, index) => authorKeys.indexOf(author) === index);
        res.json(uniqueAuthors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.route('/getLatestPosts').get(async (req, res) => {
  try {
      const latestPosts = await Post.find()
          .sort({ date: -1 }) 
          .limit(3); 
      res.json(latestPosts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.route("/userPosts").get(async (req, res) => {
  try {
    const { key } = req.query;
    const userPosts = await Post.find({ "user.key": key });
    res.json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/deletePost/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndRemove(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/editPost/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, description } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, description }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;