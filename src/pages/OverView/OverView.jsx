import React, { useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import SideBar from "../../Layout/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import MilestoneBoard from "../../components/MilestoneBoard/MilestoneBoard";
import { useEffect } from "react";
import {
  CreateMileStone,
  FetchCurrentMilestone,
} from "../../redux/actions/dashboard/dashboard.action";
import { Button, DatePicker, Input, Modal, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OverView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [milestone, setMileStone] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectrefId: null,
    title: "",
    dueDate: "",
  });

  const dashboardData = useSelector((state) => state?.dashboard);
  const currentProject = localStorage.getItem("currentProject");

  useEffect(() => {
    if (!currentProject) {
      navigate("/projects");
    } else {
      setFormData({ ...formData, projectrefId: currentProject });
    }
  }, [dashboardData]);

  useEffect(() => {
    dispatch(FetchCurrentMilestone(currentProject));
  }, []);

  useEffect(() => {
    setMileStone(dashboardData?.dashboard);
  }, [dashboardData]);

  const handleCreateMilestone = () => {
    console.log("SEND", formData);
    dispatch(CreateMileStone(formData));
  };

  return (
    <SideBar>
      <Box w="100%" p={4}>
        {modalOpen && (
          <Modal
            className="ant-modal"
            title="Create milestone"
            open={modalOpen}
            footer={null}
            // onOk={handleOk}
            onCancel={() => setModalOpen(false)}
          >
            <div style={{ padding: 20, width: 300, margin: "0 auto" }}>
              <p style={{ marginRight: 10, color: "#929292" }}>Title</p>
              <Input
                placeholder="Milestone title"
                style={{ marginBottom: 20 }}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <p style={{ marginRight: 10, color: "#929292" }}>Due date</p>
              <DatePicker
                style={{ width: 260, marginBottom: 20 }}
                onChange={(value) =>
                  setFormData({ ...formData, dueDate: value?._d })
                }
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className="button_style"
                onClick={() => handleCreateMilestone()}
              >
                Create
              </Button>
            </div>
          </Modal>
        )}
        {dashboardData?.dashboardLoading ? (
          <Skeleton active />
        ) : (
          <div className="board_container">
            <div className="board_container_child">
              {milestone &&
                milestone.map((ele) => {
                  return <MilestoneBoard data={ele} />;
                })}
              <PlusOutlined
                onClick={() => setModalOpen(true)}
                style={{
                  marginTop: 20,
                  cursor: "pointer",
                  fontSize: "25px",
                  color: "#929292",
                }}
              />
            </div>
          </div>
        )}
      </Box>
    </SideBar>
  );
};

export default OverView;
