import { Card, Col, Dropdown, Menu, Row, Space, Table } from "antd";
import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import SideBar from "../../Layout/SideBar/SideBar";

const columns = [
  {
    // title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    // title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    // title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    name: "Stucture the Data",
    age: "Progress",
    address: "Update",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: "Completed",
    address: "Update",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: "To Do",
    address: "Update",
    tags: ["cool", "teacher"],
  },
];

const ToDo = () => {
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Nandhu
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Sandra
            </a>
          ),
        },
      ]}
    />
  );
  return (
    <SideBar>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title="Tasks"
              extra={
                <Dropdown overlay={menu}>
                  <a>
                    <Space>
                      My tasks
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              }
              bordered={false}
            >
              <Table showHeader={false} columns={columns} dataSource={data} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="My mentions" bordered={false}>
              My mentions
            </Card>
          </Col>
        </Row>
      </div>
    </SideBar>
  );
};

export default ToDo;
