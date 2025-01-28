const PostService = require("../services/postService");

class PostController {
  async createPost(req, res) {
    try {
      const { content } = req.body;
      const post = await PostService.createPost(content, req.userId);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const post = await PostService.toggleLike(id, req.userId);
      res.json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async addComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const post = await PostService.addComment(id, req.userId, content);
      res.json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new PostController();
