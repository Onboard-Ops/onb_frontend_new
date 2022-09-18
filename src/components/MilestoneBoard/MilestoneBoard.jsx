import {
  Box,
  Tag,
  TagLeftIcon,
  TagLabel,
  Flex,
  Icon,
  Heading,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  InfoIcon,
  ViewOffIcon,
  TimeIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import React from "react";

import "./style.css";

const MilestoneBoard = () => {
  return (
    <div style={{ width: "20%", marginBottom: "20px" }}>
      <div className="milestone_header">
        <h1 className="milestone_title">On Progress</h1>
        <Tag variant="solid" bgColor="#b1b1b1" fontSize="12px">
          Due 6/14
        </Tag>
      </div>
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="6px"
        padding="10px"
        marginBottom="15px"
        borderColor="#bdbdbd"
        cursor="pointer"
      >
        <Flex justifyContent="space-between">
          <Tag size="sm" key="sm" variant="subtle" colorScheme="green">
            <TagLeftIcon boxSize="12px" as={CheckCircleIcon} />
            <TagLabel>Complete</TagLabel>
          </Tag>
          <Icon as={ViewOffIcon} color="#727272" />
        </Flex>
        <Heading marginTop="20px" size="md" fontSize="18px" fontWeight="normal">
          Get account info
        </Heading>
        <Flex justifyContent="space-between" marginTop="20px">
          <Tag colorScheme="red" borderRadius="full" fontSize="11px">
            Assigned to
          </Tag>
          <p style={{ fontSize: "11px", color: "#727272" }}>30/12/2022</p>
        </Flex>
      </Box>
      <Icon
        style={{ display: "flex", justifyContent: "center", margin: "auto" }}
        as={PlusSquareIcon}
        color="#727272"
        fontSize="2xl"
        cursor="pointer"
      />
    </div>
  );
};

export default MilestoneBoard;
