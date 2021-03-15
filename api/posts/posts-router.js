// implement your posts router here
const express = require('express');
const router = express.Router();
module.exports = router;

const Posts = require('./posts-model');

/* ---- GET - Gets all posts ---- */
router.get('/', (req, res) => {
	Posts.find()
		.then((data) => res.status(200).json(data))
		.catch(() => res.status(500).json({ message: "The posts information could not be retrieved" }))
});


/* ---- GET - Gets post by id ---- */
router.get('/:id', (req, res) => {
	const { id } = req.params;

	Posts.findById(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "The post with the specified ID does not exist" });
			} else {
				res.status(200).json(data);
			}
		})
		.catch(() => res.status(500).json({ message: "The post information could not be retrieved" }))
});


/* ---- POST - Creates a new post ---- */
router.post('/', (req, res) => {
	const newPost = req.body;

	if (!newPost.title || !newPost.contents) {
		res.status(400).json({ message: "Please porvide title and contents for the post" });
	} else {
		Posts.insert(newPost)
			.then((data) => res.status(201).json(data))
			.catch(() => res.status(500).json({ message: "There was an error while saving the post to the database" }))
	}
});


/* ---- PUT - Updates post by id ---- */
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const updatedPost = req.body;

	if (!updatedPost.title || !updatedPost.contents) {
		res.status(400).json({ message: "Please provide title and contents for the post"});
	} else {
		Posts.update(id, updatedPost)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "The post with the specified ID does not exist." });
			} else {
				res.status(200).json(data);
			}
		})
		.catch(() => res.status(500).json({ message: "The post information could not be modified." }));
	}
});


/* ---- DELETE - Deletes post by id ---- */
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Posts.findById(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "The post with the specified ID does not exist." });
			}
			else {
				const foundPost = data;
				Posts.remove(id)
					.then(() => {
							res.status(200).json(foundPost);
					})
					.catch(() => res.status(500).json({ message: "The post could not be removed." }));
			}
		})
		.catch(() => res.status(500).json({ message: "The post could not be removed." }));
});


/* ---- GET - Gets comments by post id ---- */
router.get('/:id/comments', (req, res) => {
	const { id } = req.params;

	Posts.findById(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "The post with the specified ID does not exist." });
			} else {
				Posts.findPostComments(id)
					.then((data) => res.status(200).json(data))
					.catch(() => res.status(500).json({ message: "The comments information could not be retrieved." }));
			}
		})
		.catch(() => res.status(500).json({ message: "The comments information could not be retrieved." }));
})
