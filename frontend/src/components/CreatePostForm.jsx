import { Box, Button, Textarea, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { posts } from "../services/api";

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);
      await posts.create(content);
      setContent("");
      onPostCreated();
      toast({
        title: "Post created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error creating post",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mb={8}>
      <VStack spacing={4}>
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          resize="vertical"
        />
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          isDisabled={!content.trim()}
          alignSelf="flex-end"
        >
          Post
        </Button>
      </VStack>
    </Box>
  );
};

export default CreatePostForm;
