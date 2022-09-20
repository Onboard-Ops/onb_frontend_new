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
import dayjs from "dayjs";
import TaskCard from "../TaskCard/TaskCard";

const MilestoneBoard = (data) => {
  // console.log(data, "MILESTONE");
  const { data: milestone } = data;
  // console.log(milestone);
  return (
    <div style={{ width: "20%", marginBottom: "20px" }}>
      <div className="milestone_header">
        <h1 className="milestone_title">{milestone?.title}</h1>
        <Tag variant="solid" bgColor="#b1b1b1" fontSize="12px">
          Due {dayjs(milestone?.dueDate).format("DD/MM")}
        </Tag>
      </div>
      <TaskCard tasks={milestone?.tasks} />
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
