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
      width: 60,
    },
    { title: "Category Name", dataIndex: "name", key: "name", width: 180 },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   fixed: "right",
    //   width: 120,
    //   render: (text, record) => (
    //     <div className="flex flex-col xs:flex-row gap-2">
    //       <Button type="primary" size="small" onClick={() => handleEdit(record)}>
    //         Edit
    //       </Button>
    //       <Popconfirm title="Are you sure to delete this category?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
    //         <Button danger size="small">Delete</Button>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="px-2 py-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Category List</h2>

      <div className="mb-4 flex flex-wrap gap-2 justify-end">
        <Button type="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
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
              responsive: true,
              showSizeChanger: false,
            }}
            scroll={{ x: 420 }}
            bordered
            className="min-w-[380px]"
          />
        )}
      </div>
    </div>
  );
}
