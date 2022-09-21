import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SideBar from "../../Layout/SideBar/SideBar";

const CustomerInfo = () => {
  const [value, setValue] = useState("");
  return (
    <SideBar>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#333", fontSize: 30, fontWeight: "bold" }}>
              OnBoard Ops
            </p>
            <Button className="button_style">Save info</Button>
          </div>
        }
        bordered={false}
      >
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Card>
    </SideBar>
  );
};

export default CustomerInfo;
