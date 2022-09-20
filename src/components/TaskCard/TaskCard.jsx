import React from "react";
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
import dayjs from "dayjs";

const TaskCard = ({ tasks }) => {
  console.log(tasks, "THIS");
  return (
    <>
      {tasks?.map((ele, i) => {
        return (
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
                <TagLabel>{ele?.status?.replace("_", " ")}</TagLabel>
              </Tag>
              <Icon as={ViewOffIcon} color="#727272" />
            </Flex>
            <Heading
              marginTop="20px"
              size="md"
              fontSize="18px"
              fontWeight="normal"
            >
              {ele?.title}
            </Heading>
            <Flex justifyContent="space-between" marginTop="20px">
              <Tag colorScheme="red" borderRadius="full" fontSize="11px">
                Assigned to
              </Tag>
              <p style={{ fontSize: "11px", color: "#727272" }}>
                {dayjs(ele?.dueDate).format("DD-MM-YYYY")}
              </p>
            </Flex>
          </Box>
        );
      })}
    </>
  );
};

export default TaskCard;
