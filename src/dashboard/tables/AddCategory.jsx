import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Form, Input, Button, message } from "antd";

export default function AddCategory() {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch category by ID and set form initial values for edit
      axios
        .get(`${API_BASE_URL}category/${id}`)
        .then((res) => {
          if (res.data) {
            setInitialValues({ name: res.data.name });
          }
        })
        .catch((err) => {
          message.error("Failed to load category data");
        });
    }
  }, [id]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (id) {
        // Edit existing category
        await axios.put(`${API_BASE_URL}category/${id}`, values);
        message.success("Category updated successfully");
      } else {
        // Add new category
        await axios.post(`${API_BASE_URL}category`, values);
        message.success("Category added successfully");
      }
      navigate("/dashboard/CategoryList");
    } catch (error) {
      message.error("Failed to save category");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        {id ? "Edit Category" : "Add New Category"}
      </h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        key={initialValues ? "edit" : "add"} // Reset form when initialValues change
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please input the category name!" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {id ? "Update Category" : "Add Category"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
