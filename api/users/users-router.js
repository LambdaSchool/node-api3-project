const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require('./users-model')
const Post =require('../posts/posts-model')


const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res,next) => {

  User.get()
  .then(users =>{res.status(200).json(users)
})
  .catch(next)
});



router.get('/:id', validateUserId, async (req, res) => {
 res.status(200).json(req.user)
});



router.post('/', validateUser, (req, res) => {

  User.insert({name: req.name})
  .then(newUser => {
    res.status(201).json(newUser)
})
  .catch(next)
});




router.put('/:id', validateUserId, (req, res) => {

  User.update(req.params.id, {name: req.name})
  .then(updatedUser =>{
    res.status(200).json(updatedUser)
})
  .catch(next)
});




router.delete('/:id', validateUserId, (req, res,next) => {

 User.remove(req.params.id)
  .then(removedUser =>{
    res.json(removedUser)
})
  .catch(next)
});




router.get('/:id/posts',validateUserId, (req, res,next) => {
  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
} catch (err){
    next(err)
}
});




router.post('/:id/posts', validatePost, validateUserId, async (req, res,next) => {
  try {
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text
})
    res.status(201).json(result)
} catch (err){
    next(err)
}
});

// do not forget to export the router

router.use((err, req, res, next)=>{
  res.status(err.status || 500).json({
    customMessage:'Uh oh, something weird is afoot',
    message: err.message,
    stack:err.stack,
})})

module.exports = router