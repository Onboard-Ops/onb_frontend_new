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
import { useState } from "react";
import { Button, Checkbox, DatePicker, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../../index.css";

const { Option } = Select;

const MilestoneBoard = (data) => {
  // console.log(data, "MILESTONE");
  const [modalOpen, setModalOpen] = useState(false);
  const { data: milestone } = data;
  console.log(milestone);
  return (
    <div style={{ width: "250px", marginBottom: "20px" }}>
      {modalOpen && (
        <Modal
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "#333" }}>Create task</p>
              <Checkbox
                style={{ marginRight: "25px", fontSize: 16, color: "#929292" }}
              >
                Private
              </Checkbox>
            </div>
          }
          width="100vh"
          open={modalOpen}
          footer={null}
          // onOk={handleOk}
          onCancel={() => setModalOpen(false)}
        >
          <Input
            size="large"
            placeholder="Task title"
            style={{ borderBottom: "1px solid #ddd", marginBottom: 10 }}
            bordered={false}
          />
          <div className="task_modal_content">
            <div className="task_modal_flex" style={{ marginBottom: 20 }}>
              <div style={{ marginRight: 100 }}>
                <p style={{ marginRight: 10, color: "#929292" }}>Assign to</p>
                <Select
                  style={{
                    width: 200,
                  }}
                  placeholder="Click here"
                  className="assign_select"
                  bordered={false}
                  // onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              </div>
              <div>
                <p style={{ marginRight: 10, color: "#929292" }}>Due date</p>
                <DatePicker bordered={false} />
              </div>
            </div>
            <div className="task_modal_flex">
              <div style={{ marginRight: 100 }}>
                <p style={{ marginRight: 10, color: "#929292" }}>Status</p>
                <Select
                  bordered={false}
                  style={{
                    width: 200,
                  }}
                  placeholder="Click here"
                  className="assign_select"
                  // onChange={handleChange}
                >
                  <Option value="jack">Not started</Option>
                  <Option value="jack">In progress</Option>
                </Select>
              </div>
              <div>
                <p style={{ marginRight: 10, color: "#929292" }}>
                  Dependenices
                </p>
                <Input bordered={false} placeholder="Type in here" />
              </div>
            </div>
          </div>
          <hr />
          <div style={{ padding: 10 }}>
            <Input bordered={false} placeholder="Add comments" />
          </div>
          <hr />
          <div style={{ padding: 10, marginTop: 10 }}>
            <TextArea
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Task description"
              bordered={false}
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="button_style">Create task</Button>
          </div>
        </Modal>
      )}
      <h1 className="milestone_title">{milestone?.title}</h1>
      <p className="milestone_due">
        Due {dayjs(milestone?.dueDate).format("DD/MM")}
      </p>
      <hr
        style={{ marginBottom: 20, border: "1px solid #c4c4c4", marginTop: 5 }}
      />
      <TaskCard tasks={milestone?.tasks} />
      <PlusOutlined
        onClick={() => setModalOpen(true)}
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
