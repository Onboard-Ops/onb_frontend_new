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
import { PlusOutlined } from "@ant-design/icons";

import React from "react";

import "./style.css";
import dayjs from "dayjs";
import TaskCard from "../TaskCard/TaskCard";

const MilestoneBoard = (data) => {
  // console.log(data, "MILESTONE");
  const { data: milestone } = data;
  console.log(milestone);
  return (
    <div style={{ width: "250px", marginBottom: "20px" }}>
      <h1 className="milestone_title">{milestone?.title}</h1>
      <p className="milestone_due">
        Due {dayjs(milestone?.dueDate).format("DD/MM")}
      </p>
      <hr
        style={{ marginBottom: 20, border: "1px solid #c4c4c4", marginTop: 5 }}
      />
      <TaskCard tasks={milestone?.tasks} />
      <PlusOutlined
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          cursor: "pointer",
          fontSize: "25px",
          color: "#929292",
        }}
      />
    </div>
  );
};

export default MilestoneBoard;
