import React from "react";
import {
  Box,
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
import { Tag } from "antd";
import dayjs from "dayjs";
import { MinusCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const TaskCard = ({ tasks }) => {
  return (
    <>
      {tasks?.map((ele, i) => {
        return (
          <Box
            w="250px"
            borderWidth="2px"
            borderRadius="6px"
            padding="10px"
            marginBottom="15px"
            borderColor="#CCCCCC"
            cursor="pointer"
            backgroundColor="#E9E9E9"
          >
            <Flex justifyContent="space-between">
              <Tag
                icon={
                  ele?.status == "not_started" ? (
                    <MinusCircleOutlined />
                  ) : ele?.status == "in_progress" ? (
                    <ClockCircleOutlined />
                  ) : (
                    <MinusCircleOutlined />
                  )
                }
                color={
                  ele?.status == "not_started"
                    ? "default"
                    : ele?.status == "in_progress"
                    ? "warning"
                    : "default"
                }
              >
                {ele?.status == "not_started"
                  ? "Not started"
                  : ele?.status == "in_progress"
                  ? "In progress"
                  : ele?.status?.replace("_", " ")}
              </Tag>
              <Icon as={ViewOffIcon} color="#727272" />
            </Flex>
            <p style={{ marginTop: 25, fontSize: 16, fontWeight: 400 }}>
              {ele?.title}
            </p>

            <Flex justifyContent="space-between" marginTop="25px">
              <Tag colorScheme="red" borderRadius="full" fontSize="11px">
                Assigned to
              </Tag>
              <p style={{ fontSize: "11px", color: "#727272" }}>
                Due {dayjs(ele?.dueDate).format("DD/MM")}
              </p>
            </Flex>
          </Box>
        );
      })}
    </>
  );
};

export default TaskCard;
