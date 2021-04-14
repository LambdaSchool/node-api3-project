const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');



function logger(req, res, next) {
  // DO YOUR MAGIC
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id)
    if(!user) {
      res.status(404).json({
        message: `user with id ${req.params.id} doesn't exist`
      })
    }else {
      req.user = user;
      next()
    }
  } catch (err){
    next(err)
  }

}

const validateUser = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.name.trim()){
    res.status(422).json({
      message: 'user name is invalid'
    })
  } else {
    next()
  }
}

const validatePost = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.text || !req.body.text.trim()){
    res.status(422).json({
      message: 'post is required'
    })
  } else {
    next()
  }

}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost
}