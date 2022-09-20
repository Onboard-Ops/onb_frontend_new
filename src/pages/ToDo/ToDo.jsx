import { Card, Col, Dropdown, Menu, Row, Space, Table, Tag } from "antd";
import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import SideBar from "../../Layout/SideBar/SideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchToDoByUserApi } from "../../redux/actions/todo/todo.action";
import dayjs from "dayjs";

const ToDo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchToDoByUserApi("63286517b5955eb54b7cd78d"));
  }, []);

  const allTodo = useSelector((state) => state.todo?.todo);

  const columns = [
    {
      // title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      // title: "Age",
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color="blue">{text?.replace("_", " ")}</Tag>,
    },
    {
      // title: "Address",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <>Due {dayjs(text).format("DD/MM")}</>,
    },
  ];

  const data =
    allTodo &&
    allTodo.length > 0 &&
    allTodo.map((ele) => {
      return {
        key: ele._id,
        _id: ele._id,
        title: ele?.title,
        status: ele?.status,
        dueDate: ele?.dueDate,
      };
    });

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
              <Table
                style={{ marginTop: "-20px" }}
                showHeader={false}
                columns={columns}
                dataSource={data}
              />
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
