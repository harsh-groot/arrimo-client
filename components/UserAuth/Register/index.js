import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../../thunks/userThunk";
import { useRouter } from "next/dist/client/router";

const Register = () => {
  const [registrationForm] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    registrationForm.resetFields();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(registration(values)).then((res) => {
      console.log("dispatch login res :>>", res);
      if(res?.payload?.user?.confirmed){
        localStorage.setItem('ACCESS_TOKEN', res?.payload?.jwt);
        router.push('/users')
      }
      registrationForm.resetFields();
    });
  };

  return (
    <div>
      <h2 className="text-center">Register your account</h2>
      <p className="text-center mb-5">
        Please enter your details to complete the registration process.
      </p>
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

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
    </div>
  );
};

export default Register;
