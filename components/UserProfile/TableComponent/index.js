import React from "react";
import { Table } from "antd";
import { table_heading } from "./index.module.css";

const TableComponent = ({ heading, onAdd, columns, data }) => {
  return (
    <section>
      <div className={`${table_heading}`}>
        <p>{heading}</p>

        <button
          type="submit"
          className="btn btn-primary animated slideInLeft  hover_color py-md-2 px-md-4"
          onClick={onAdd}
        >
          Add
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        pagination={{
          position: ["bottomRight"],
          // defaultPageSize: 10,
        }}
      />
    </section>
  );
};

export default TableComponent;
