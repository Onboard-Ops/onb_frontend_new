import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../Layout/SideBar/SideBar";

import "./style.css";

const People = () => {
  useEffect(() => {}, []);

  return (
    <SideBar>
      <div>
        <div className="people_flex">
          <Heading as="h4" size="xl" style={{ textDecoration: "underline" }}>
            People
          </Heading>
          <Button
            // onClick={onOpen}
            colorScheme="linkedin"
            variant="outline"
            mt={4}
            mr={8}
            mb={4}
          >
            Add people
          </Button>
        </div>
        <Link to={`/dashboard`}>
          <Box
            borderRadius="lg"
            display="flex"
            mt={4}
            ml={140}
            p={4}
            w="80%"
            color="vlue"
            justifyContent="space-between"
            _hover={{
              background: "#b2bcd6",
              color: "white",
            }}
            key={12}
          >
            <Text>{"John Doe"}</Text>
            <Text>{"Project Leader"}</Text>
            <Text>{"Internal Admin"}</Text>
            <Text>{"user@gmail.com"}</Text>
          </Box>
        </Link>
      </div>
    </SideBar>
  );
};

export default People;
