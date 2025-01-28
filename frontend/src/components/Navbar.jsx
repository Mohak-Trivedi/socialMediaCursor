import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <Box bg="gray.100" px={4} py={4}>
      <Flex
        maxW="container.lg"
        mx="auto"
        justify="space-between"
        align="center"
      >
        <Link to="/">
          <Heading size="md">Social Media App</Heading>
        </Link>
        <Flex gap={4}>
          {user ? (
            <>
              <Button as={Link} to="/feed" variant="ghost">
                Feed
              </Button>
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={Link} to="/signup" colorScheme="blue">
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
