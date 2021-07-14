const User = require('../users/users-router')


function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  const url = req.originalUrl
  const method = req.method
  
  console.log(`[${method}] ${url}  at ${timestamp}`)
  next()
}


function validateUserId(req, res, next) {
try{
  const user = await User.getById(req.params.id)
    if(!user){
      next({status: 404 , message: 'user cannot be found'})

} else{
    req.user = user
    next()
}}
  catch{
    res.status(500).json({
    message: 'problem finding the user'
})}
}



function validateUser(req, res, next) {
const {name} = req.body
  if(!name || !name.trim()){
    res.status(400).json({
    message:'missing required name'
})
} else{
    req.name = name.trim();
    next()
}}



function validatePost(req, res, next) {
const {text} = req.body
  if(!text || !text.trim()){
    res.status(400).json({
    message:'missing required text field'
})
} else{
    req.text = text.trim();
    next()
}}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}