const express = require('express');

const router = express.Router();

  // do your magic!
  router.post("/", validateUser, (req, res) => {
    db.insert(req.body)
      .then((user) => res.status(201).json(user))
      .catch((err) =>
        res.status(500).json({ errorMessage: "Unable to add user to database" })
      );
  });


  // do your magic!
  router.get("/", (req, res) => {
    db.get()
      .then((users) => res.status(200).json(users))
      .catch((err) =>
        res.status(500).json({ errorMessage: "Unable to retrieve users" })
      );
  });

  // do your magic!
  // id routes
router.use("/:id", validateUserId);

router.post("/:id/posts", validatePost, (req, res) => {
	postDB
		.insert({ ...req.body, ["user_id"]: req.params.id })
		.then((post) => res.status(201).json(post))
		.catch((err) =>
			res.status(500).json({ errorMessage: "Unable to create post" })
		);
});

  // do your magic!
  router.get("/:id", (req, res) => {
    db.getById(req.params.id)
      .then((user) => res.status(200).json(user))
      .catch((err) =>
        res.status(500).json({ errorMessage: "Unable to retrieve user" })
      );
  });


  // do your magic!
  router.get("/:id/posts", (req, res) => {
    db.getUserPosts(req.params.id)
      .then((posts) => res.status(200).json(posts))
      .catch((err) =>
        res.status(500).json({ errorMessage: "Unable to retrieve user posts" })
      );
  });
  
  
  // do your magic!
  router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
      .then((count) => res.sendStatus(200))
      .catch((err) =>
        res.status(500).json({ errorMessage: "Unable to remove user" })
      );
  });


  // do your magic!
  router.put("/:id", validateUser, (req, res) => {
    db.update(req.params.id, req.body)
      .then((count) => {
        db.getById(req.params.id)
          .then((user) => res.status(200).json(user))
          .catch((err) =>
            res.status(500).json({ errorMessage: "Unable to find update user" })
          );
      })
      .catch((err) =>
        res.status(500).json({ errorMessage: "Unable to update user" })
      );
  });
  
  
//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
		.then((user) => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(400).json({ message: "Invalid user id" });
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ errorMessage: "Error connecting to users database" })
		);
}


function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length !== 0) {
		req.body.name
			? next()
			: res.status(400).json({ message: "Missing required name field" });
	} else {
		res.status(400).json({ message: "Missing user data" });
	}
}


function validatePost(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length !== 0) {
		req.body.text
			? next()
			: res.status(400).json({ message: "Missing required text field" });
	} else {
		res.status(400).json({ message: "Missing post data" });
	}
}

module.exports = router;
