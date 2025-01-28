const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/auth");

// Protect all routes
router.use(authMiddleware);

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.post("/:id/like", postController.toggleLike);
router.post("/:id/comments", postController.addComment);

module.exports = router;
