import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const { Option } = Select;

const getBaseUrl = () => API_BASE_URL;

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}${url}`;
};

export default function ProductSliderForm() {
  const { control, handleSubmit, reset } = useForm();
  const [productOptions, setProductOptions] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploadedMediaIds, setUploadedMediaIds] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  // Fetch products for dropdown
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${getBaseUrl()}product`);
        setProductOptions(res.data);
      } catch {
        message.error("Failed to load products");
      }
    }
    fetchProducts();
  }, []);

  // Handle file selection
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setUploadedMediaIds([]);
  };

  // Upload images one by one to backend
  const uploadMediaFiles = async () => {
    setUploading(true);
    try {
      const uploadPromises = fileList.map(({ originFileObj }) => {
        const formData = new FormData();
        formData.append("media", originFileObj);
        return axios
          .post(`${getBaseUrl()}media`, formData)
          .then((res) => res.data.data);
      });
      const mediaIds = await Promise.all(uploadPromises);
      setUploadedMediaIds(mediaIds);
      message.success("Images uploaded successfully");
      return mediaIds;
    } catch {
      message.error("Image upload failed");
      return [];
    } finally {
      setUploading(false);
    }
  };

  // On form submit, upload images if not done yet, then submit payload
  const onSubmit = async (data) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one image");
      return;
    }
    let mediaIds = uploadedMediaIds;
    if (mediaIds.length === 0) {
      mediaIds = await uploadMediaFiles();
      if (mediaIds.length === 0) return;
    }

    const payload = {
      name: data.name,
      description: data.description,
      product: data.product,
      image: mediaIds, // array of uploaded media IDs
    };

    try {
      await axios.post(`${getBaseUrl()}slider`, payload);
      message.success("Slider added successfully");
      reset();
      setFileList([]);
      setUploadedMediaIds([]);
      navigate("/dashboard/ProductSliderList");
    } catch {
      message.error("Failed to add slider");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow my-6">
      <h2 className="text-xl font-bold mb-4">Add New Slider</h2>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Name" required>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Enter slider name" />
                {fieldState.error && (
                  <p className="text-red-600">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item label="Description" required>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field, fieldState }) => (
              <>
                <Input.TextArea {...field} placeholder="Enter description" rows={4} />
                {fieldState.error && (
                  <p className="text-red-600">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item label="Product" required>
          <Controller
            name="product"
            control={control}
            rules={{ required: "Please select a product" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  placeholder="Select product"
                  showSearch
                  optionFilterProp="children"
                  allowClear
                >
                  {productOptions.map((prod) => (
                    <Option key={prod._id} value={prod._id}>
                      {prod.name}
                    </Option>
                  ))}
                </Select>
                {fieldState.error && (
                  <p className="text-red-600">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item label="Slider Images" required>
          <Upload
            accept="image/*"
            listType="picture-card"
            multiple
            fileList={fileList}
            beforeUpload={() => false} // disable auto upload
            onChange={handleUploadChange}
          >
            {fileList.length >= 5 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          {fileList.length > 0 && uploadedMediaIds.length === 0 && (
            <Button onClick={uploadMediaFiles} loading={uploading} style={{ marginTop: 8 }}>
              Upload Images
            </Button>
          )}
          {uploadedMediaIds.length > 0 && (
            <div style={{ color: "green", marginTop: 8 }}>Images uploaded successfully!</div>
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={uploading} block>
          Submit
        </Button>
      </Form>
    </div>
  );
}
