import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { posts } from "../services/api";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchPosts = async () => {
    try {
      const { data } = await posts.getAll();
      setAllPosts(data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch posts");
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg" mb={4}>
          Feed
        </Heading>
        <CreatePostForm onPostCreated={fetchPosts} />
        {allPosts.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            No posts yet. Be the first to post!
          </Text>
        ) : (
          allPosts.map((post) => (
            <PostCard key={post._id} post={post} onUpdate={fetchPosts} />
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Feed;
