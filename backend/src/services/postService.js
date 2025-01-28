const Post = require("../models/Post");

class PostService {
  async createPost(content, userId) {
    const post = await Post.create({
      content,
      author: userId,
    });
    return post.populate("author", "username");
  }

  async getAllPosts() {
    return Post.find()
      .populate("author", "username")
      .populate("comments.author", "username")
      .sort({ createdAt: -1 });
  }

  async toggleLike(postId, userId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    return post.populate("author", "username");
  }

  async addComment(postId, userId, content) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    post.comments.push({
      author: userId,
      content,
    });

    await post.save();
    return post.populate(["author", "comments.author"]);
  }
}

module.exports = new PostService();
