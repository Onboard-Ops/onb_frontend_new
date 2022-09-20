import { Card, Col, Dropdown, Menu, Row, Space, Table, Tag } from "antd";
import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import SideBar from "../../Layout/SideBar/SideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMentionsAPi,
  FetchToDoByUserApi,
} from "../../redux/actions/todo/todo.action";
import dayjs from "dayjs";
import { FetchPeopleApi } from "../../redux/actions";
import { useState } from "react";

const ToDo = () => {
  const dispatch = useDispatch();

  const allTodo = useSelector((state) => state.todo?.todo);
  const allMentions = useSelector((state) => state.todo?.mentions);
  const allPeople = useSelector((state) => state.people?.people);
  const authUser = useSelector((state) => state?.auth?.user);

  const [currentUser, setCurrentUser] = useState({
    fullName: "My tasks",
    _id: authUser?._id,
  });

  useEffect(() => {
    dispatch(FetchToDoByUserApi(currentUser?._id));
    dispatch(FetchPeopleApi());
    dispatch(FetchMentionsAPi());
  }, []);

  const todoColumn = [
    {
      dataIndex: "title",
      key: "title",
    },
    {
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color="blue">{text?.replace("_", " ")}</Tag>,
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <>Due {dayjs(text).format("DD/MM")}</>,
    },
  ];

  const mentionsColumn = [
    {
      dataIndex: "commentBody",
      key: "commentBody",
    },
    {
      dataIndex: "commentBy",
      key: "commentBy",
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <>{dayjs(text).format("MM:DD:YYYY")}</>,
    },
  ];

  const todoData =
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

  const mentionsData =
    allMentions &&
    allMentions.length > 0 &&
    allMentions.map((ele) => {
      return {
        commentBody: ele?.commentBody,
        commentBy: ele?.commentBy?.fullName,
        createdAt: ele?.createdAt,
      };
    });

  const menu = (
    <Menu
      items={
        allPeople &&
        allPeople.length > 0 &&
        allPeople.map((ele, i) => {
          return {
            key: i + 1,
            label: (
              <p
                onClick={() => {
                  dispatch(FetchToDoByUserApi(ele?._id));
                  setCurrentUser({ fullName: ele?.fullName, _id: ele?._id });
                }}
              >
                {ele?.fullName}
              </p>
            ),
          };
        })
      }
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
                      {currentUser?.fullName}
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
                columns={todoColumn}
                dataSource={todoData}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="My mentions" bordered={false}>
              <Table
                style={{ marginTop: "-20px" }}
                showHeader={false}
                columns={mentionsColumn}
                dataSource={mentionsData}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </SideBar>
  );
};

export default ToDo;
