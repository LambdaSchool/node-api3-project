const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const mw = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});



router.put('/:id', mw.validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.delete('/:id', mw.validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(()=> {
    res.status(200).json({message: 'the user objects last words were, "I will haunt yoooou!"'})
  })
});

router.get('/:id/posts', mw.validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(next)
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost,(req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
const postBody = {...req.body.text, user_id: req.params.id};
Posts.add(postBody)
.then(post => {
  res.status(210).json(post)
})
.catch(err => {
  console.log(err);
  res.status(500).json({
    message: 'error adding post'
  })
})
});
// eslint-disable-next-line
router.use((err, req, res, next) => { 
  res.status(500).json({
    message: err.message, 
    stack: err.stack, 
    custom: 'something went terrible in the users router'
  })
})
module.exports = router;
// do not forget to export the router
