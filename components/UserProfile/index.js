import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../../thunks/userThunk";
import { Modal, Button, Form, Input, Popconfirm } from "antd";
import { registration } from "../../thunks/userThunk";
import { httpDeleteUser, httpUpdateUser } from "../../requests/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const [allUsers, setUsers] = useState();
  const [loginedUsers, setLoginedUsers] = useState();

  const [currentUser, setCurrentUsers] = useState();

  const [isModalOpen, setIsModalOpen] = useState({
    status: false,
    type: "Add",
  });
  const dispatch = useDispatch();
  const [registrationForm] = Form.useForm();

  const onFinish = (values) => {
    if (isModalOpen?.type === "Add") {
      dispatch(registration(values)).then((res) => {
        dispatch(users()).then((res) => {
          setUsers(res?.payload?.data);
        });
        registrationForm.resetFields();
        setIsModalOpen({
          status: false,
        });
      });
    } else {
      const payload = {
        body: {
          id: currentUser?._id,
          username: values?.username,
          email: values?.email,
        },
      };

      httpUpdateUser(payload).then((res) => {
        if (res?.data) {
          dispatch(users()).then((res) => {
            setUsers(res?.payload?.data);
          });
          registrationForm.resetFields();
          setIsModalOpen({
            status: false,
          });
        }
      });
    }
  };
  const handleCancel = () => {
    setIsModalOpen({
      status: false,
    });
  };

  useEffect(() => {
    dispatch(users()).then((res) => {
      setUsers(res?.payload?.data);
    });

    if (window && window.localStorage) {
      const loginUser = localStorage.getItem("USER");
      const _loginUser = JSON.parse(loginUser);
      setLoginedUsers(_loginUser);
    }
  }, []);

  const onAddUser = () => {
    registrationForm.resetFields();
    setIsModalOpen({
      status: true,
      type: "Add",
    });
  };

  const onUserDelete = (record) => {
    const payload = {
      body: { id: record?._id },
      pathParams: { name: record?.username },
    };

    httpDeleteUser(payload).then((res) => {
      if (res?.data?.deletedCount) {
        dispatch(users()).then((res) => {
          setUsers(res?.payload?.data);
        });
      }
    });
  };

  const onUserUpdate = (record) => {
    setIsModalOpen({
      status: true,
      type: "Update",
    });

    setCurrentUsers(record);

    registrationForm.setFieldsValue({
      ...record,
    });
  };

  const columns = [
    {
      title: "S.No",
      key: "sno",
      width: "20px",
      render: (text, object, index) => index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => onUserUpdate(record)}
          >
            <EditOutlined />
          </button>
          {loginedUsers?.id !== record?._id && (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => onUserDelete(record)}
            >
              <DeleteOutlined />
            </button>
          )}
        </>
      ),
    },
  ];
  return (
    <div className="container">
      <TableComponent
        columns={columns}
        data={allUsers}
        heading={"All Users"}
        onAdd={onAddUser}
      />

      <Modal
        title={isModalOpen?.type + " User"}
        open={isModalOpen?.status}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={registrationForm}
          name="registration"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {isModalOpen?.type === "Add" ? (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          ) : null}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;
