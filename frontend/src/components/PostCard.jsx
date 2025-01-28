import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Input,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { posts } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const PostCard = ({ post, onUpdate }) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    try {
      await posts.like(post._id);
      onUpdate();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);
      await posts.comment(post._id, comment);
      setComment("");
      onUpdate();
    } catch (error) {
      console.error("Error commenting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} mb={4}>
      <Flex gap={3} mb={4}>
        <Avatar size="sm" name={post.author.username} />
        <VStack align="start" spacing={1} flex={1}>
          <Text fontWeight="bold">{post.author.username}</Text>
          <Text>{post.content}</Text>
        </VStack>
      </Flex>

      <HStack spacing={4} mb={4}>
        <Button
          size="sm"
          colorScheme={post.likes.includes(user?._id) ? "blue" : "gray"}
          onClick={handleLike}
        >
          {post.likes.length} Likes
        </Button>
        <Text fontSize="sm">{post.comments.length} Comments</Text>
      </HStack>

      <form onSubmit={handleComment}>
        <Flex gap={2}>
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            isDisabled={!comment.trim()}
          >
            Comment
          </Button>
        </Flex>
      </form>

      {post.comments.length > 0 && (
        <VStack align="stretch" mt={4} spacing={2}>
          {post.comments.map((comment, index) => (
            <Box key={index} bg="gray.50" p={2} borderRadius="md">
              <Text fontSize="sm" fontWeight="bold">
                {comment.author.username}
              </Text>
              <Text fontSize="sm">{comment.content}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default PostCard;
