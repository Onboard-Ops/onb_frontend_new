import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import SideBar from "../../Layout/SideBar/SideBar";

import "./style.css";
import MilestoneBoard from "../../components/MilestoneBoard/MilestoneBoard";

const OverView = () => {
  return (
    <SideBar>
      <Box w="100%" p={4}>
        <div className="board_container">
          <div className="board_container_child">
            <MilestoneBoard />
            <MilestoneBoard />
            <MilestoneBoard />
            <Icon
              as={PlusSquareIcon}
              color="#727272"
              fontSize="2xl"
              cursor="pointer"
            />
          </div>
        </div>
      </Box>
    </SideBar>
  );
};

export default OverView;
