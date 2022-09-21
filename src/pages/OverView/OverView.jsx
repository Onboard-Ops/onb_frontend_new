import React, { useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import SideBar from "../../Layout/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import MilestoneBoard from "../../components/MilestoneBoard/MilestoneBoard";
import { useEffect } from "react";
import { FetchCurrentMilestone } from "../../redux/actions/dashboard/dashboard.action";
import { Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const OverView = () => {
  const dispatch = useDispatch();
  const [milestone, setMileStone] = useState([]);

  const dashboardData = useSelector((state) => state?.dashboard);

  useEffect(() => {
    dispatch(FetchCurrentMilestone("63286540b5955eb54b7cd792"));
  }, []);

  useEffect(() => {
    setMileStone(dashboardData?.dashboard);
  }, [dashboardData]);

  return (
    <SideBar>
      <Box w="100%" p={4}>
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
