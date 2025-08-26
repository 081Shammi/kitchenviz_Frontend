import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Spin, Popconfirm } from "antd";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const API = `${API_BASE_URL}category`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
    }
    setLoading(false);
  }

  const paginatedData = categories.slice((current - 1) * pageSize, current * pageSize);

  const handlePageChange = (page) => {
    setCurrent(page);
  };

  const handleEdit = (record) => {
    // Navigate to edit page passing id (you need to implement edit page)
    navigate(`/dashboard/CategoryList/edit/${record._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };

  const handleAddCategory = () => {
    navigate("/dashboard/CategoryList/add");
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      render: (text, record, index) => (current - 1) * pageSize + index + 1,
      width: 80,
    },
    { title: "Category Name", dataIndex: "name", key: "name", width: 200 },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (date) => new Date(date).toLocaleString(),
    //   width: 200,
    // },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 140,
      render: (text, record) => (
        <div className="flex gap-2">
          <Button type="primary" size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm title="Are you sure to delete this category?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
            <Button danger size="small">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Category List</h2>

      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey={(record) => record._id}
          pagination={{
            current,
            pageSize,
            total: categories.length,
            onChange: handlePageChange,
          }}
          scroll={{ x: 800 }}
          bordered
        />
      )}
    </div>
  );
}
