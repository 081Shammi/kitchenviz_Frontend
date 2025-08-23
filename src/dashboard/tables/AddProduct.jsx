import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_BASE_URL } from "../../config";

const { Option } = Select;

export default function AddProduct() {
  const { control, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // For Multiple Images
  const [imageList, setImageList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);

  // Get Categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(`${API_BASE_URL}category`);
        setCategories(res.data);
      } catch (error) {
        message.error("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);

  // Change handler for images
  const handleImageChange = ({ fileList }) => {
    setImageList(fileList);
    setUploadedImageIds([]);
  };

  // Upload multiple images, return array of media IDs
  const apiUpload = `${API_BASE_URL}media`;
  const uploadImages = async () => {
    if (imageList.length === 0) {
      message.error("No images to upload");
      return;
    }
    setUploading(true);
    try {
      const ids = [];
      for (const file of imageList) {
        const data = new FormData();
        data.append("media", file.originFileObj);
        const response = await fetch(apiUpload, {
          method: "POST",
          body: data,
        });
        if (!response.ok) throw new Error("Upload failed");
        const resData = await response.json();
        ids.push(resData.data);
      }
      setUploadedImageIds(ids);
      message.success("Images uploaded successfully");
    } catch {
      message.error("Failed to upload images");
      setUploadedImageIds([]);
    }
    setUploading(false);
  };

  // Remove all images
  const removeImages = () => {
    setImageList([]);
    setUploadedImageIds([]);
  };

  // Form submit handler
  const onSubmit = async (formData) => {
    if (uploadedImageIds.length === 0) {
      message.error("Please upload and confirm images before submitting");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        image: uploadedImageIds, // This is an array!
      };
      await axios.post(`${API_BASE_URL}product`, payload);

      message.success("Product added successfully");
      reset();
      setImageList([]);
      setUploadedImageIds([]);
      navigate("/dashboard/ProductList");
    } catch (error) {
      message.error("Failed to add product");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Add New Product</h2>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Product Name"
          required
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="Enter product name" />}
          />
        </Form.Item>

        <Form.Item
          label="Product Images"
          required
          // No need for extra rules, validation done on submit
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={imageList}
            onChange={handleImageChange}
            beforeUpload={() => false}
            multiple
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          {imageList.length > 0 && !uploadedImageIds.length && (
            <Button onClick={uploadImages} type="primary" loading={uploading} style={{ marginTop: 8 }}>
              Upload Images
            </Button>
          )}
          {imageList.length > 0 && (
            <Button onClick={removeImages} danger style={{ marginLeft: 8, marginTop: 8 }}>
              Remove All
            </Button>
          )}
          {uploadedImageIds.length > 0 && (
            <div style={{ color: "green", marginTop: 8 }}>Images uploaded!</div>
          )}
        </Form.Item>

        <Form.Item
          label="Category"
          required
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select placeholder="Select category" {...field} allowClear>
                {categories.map((cat) => (
                  <Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          required
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input.TextArea rows={4} {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Price (₹)"
          required
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <Controller
            name="price"
            control={control}
            rules={{ required: true, min: 0 }}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Form.Item label="Discounted Price (₹)">
          <Controller
            name="productDiscountedPrice"
            control={control}
            rules={{ min: 0 }}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Form.Item
          label="Count In Stock"
          required
          rules={[{ required: true, message: "Please enter stock count" }]}
        >
          <Controller
            name="countInStock"
            control={control}
            rules={{ required: true, min: 0 }}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
