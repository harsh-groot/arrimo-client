import React from "react";
import { Tabs } from "antd";
import Login from "./Login";
import Register from "./Register";
import Image from "next/image";

const UserAuth = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Login`,
      children: <Login />,
    },
    {
      key: "2",
      label: `Register`,
      children: <Register />,
    },
  ];
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 d-none  d-lg-block">
          <Image
            src="/assets/images/login.svg"
            alt="Login Picture"
            width={500}
            height={500}
          />
        </div>
        <div className="col-md-7 ">
          <Tabs
            className=""
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
