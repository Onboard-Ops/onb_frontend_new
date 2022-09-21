import {
  Box,
  Tag,
  TagLeftIcon,
  TagLabel,
  Flex,
  Icon,
  Heading,
} from "@chakra-ui/react";

import { PlusOutlined } from "@ant-design/icons";

import React from "react";

import "./style.css";
import dayjs from "dayjs";
import TaskCard from "../TaskCard/TaskCard";
import { useState } from "react";
import { Button, Checkbox, DatePicker, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { CreateTaskApi } from "../../redux/actions/dashboard/dashboard.action";
import { FetchPeopleApi } from "../../redux/actions/people/people.action";
import { useEffect } from "react";

const { Option } = Select;

const MilestoneBoard = (data) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMileStone, setCurrentMileStone] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    task_content: "",
    assignedTo: "",
    assignedBy: null,
    milestone_ref: currentMileStone,
    // comment: "",
    status: "",
    dependencies: "",
    dueDate: "",
    private: false,
  });
  const dispatch = useDispatch();
  const { data: milestone } = data;

  const people = useSelector((state) => state?.people?.people);
  const authUser = useSelector((state) => state?.auth?.user);

  console.log(authUser);

  useEffect(() => {
    setFormData({ ...formData, assignedBy: authUser?._id });
  }, []);

  useEffect(() => {
    setFormData({ ...formData, milestone_ref: currentMileStone });
  }, [milestone, currentMileStone]);

  const handleCreateTask = () => {
    console.log("AUTH USER", authUser?._id);
    setFormData({ ...formData, assignedBy: authUser?._id });
    console.log(formData, "CALLING");
    dispatch(CreateTaskApi(formData));
  };

  return (
    <div style={{ width: "250px", marginBottom: "20px" }}>
      {modalOpen && (
        <Modal
          className="ant-modal"
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "#333" }}>Create task</p>
              <Checkbox
                style={{ marginRight: "25px", fontSize: 16, color: "#929292" }}
                onChange={() =>
                  setFormData({ ...formData, private: !formData?.private })
                }
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
            value={formData?.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
                  placeholder="Choose person"
                  className="assign_select"
                  bordered={false}
                  onChange={(value) =>
                    setFormData({ ...formData, assignedTo: value })
                  }
                >
                  {people &&
                    people.length > 0 &&
                    people.map((ele, i) => {
                      return (
                        <Option key={i} value={ele?._id}>
                          {ele?.fullName}
                        </Option>
                      );
                    })}
                </Select>
              </div>
              <div>
                <p style={{ marginRight: 10, color: "#929292" }}>Due date</p>
                <DatePicker
                  onChange={(value) =>
                    setFormData({ ...formData, dueDate: value?._d })
                  }
                  bordered={false}
                />
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
                  placeholder="Choose a status"
                  className="assign_select"
                  onChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <Option value="not_started">Not started</Option>
                  <Option value="in_progress">In progress</Option>
                  <Option value="complete">Complete</Option>
                  <Option value="on_hold">On hold</Option>
                </Select>
              </div>
              <div>
                <p style={{ marginRight: 10, color: "#929292" }}>
                  Dependenices
                </p>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, dependencies: e.target.value })
                  }
                  bordered={false}
                  placeholder="Type in here"
                />
              </div>
            </div>
          </div>
          <hr />
          <div style={{ padding: 10 }}>
            <Input
              bordered={false}
              placeholder="Add comments"
              // onChange={(e) =>
              //   setFormData({ ...formData, comment: e.target.value })
              // }
            />
          </div>
          <hr />
          <div style={{ padding: 10, marginTop: 10 }}>
            <TextArea
              // value={value}
              onChange={(e) =>
                setFormData({ ...formData, task_content: e.target.value })
              }
              placeholder="Task description"
              bordered={false}
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="button_style" onClick={() => handleCreateTask()}>
              Create task
            </Button>
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
        onClick={() => {
          dispatch(FetchPeopleApi());
          setModalOpen(true);
          setCurrentMileStone(milestone?.tasks[0]?.milestone_ref);
        }}
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
