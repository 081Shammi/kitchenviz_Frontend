import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, InputNumber, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_BASE_URL } from "../../config";

const { Option } = Select;

export default function AddProduct() {
  const { id } = useParams(); // for edit mode
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (id) fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}category`);
      setCategories(data);
    } catch {
      message.error("Failed to fetch categories");
    }
  };

  const fetchProduct = async () => {
  setLoading(true);
  try {
    const { data } = await axios.get(`${API_BASE_URL}product/${id}`);

    reset({
      name: data.name || "",
      category: data.category?._id || data.category || "",
      description: data.description || "",
      price: data.price || 0,
      productDiscountedPrice: data.productDiscountedPrice || 0,
      countInStock: data.countInStock || 0,
    });

    if (Array.isArray(data.image) && data.image.length > 0) {
      const files = data.image.map((imgObj, idx) => {
        let url = "";
        if (imgObj.image_url) {
          if (imgObj.image_url.full?.high_res) {
            url = imgObj.image_url.full.high_res.startsWith("http")
              ? imgObj.image_url.full.high_res
              : `${API_BASE_URL}${imgObj.image_url.full.high_res}`;
          } else if (imgObj.image_url.thumbnail?.high_res) {
            url = imgObj.image_url.thumbnail.high_res.startsWith("http")
              ? imgObj.image_url.thumbnail.high_res
              : `${API_BASE_URL}${imgObj.image_url.thumbnail.high_res}`;
          }
        }
        return {
          uid: `img-${idx}`,
          name: imgObj.name?.original || `Image ${idx + 1}`,
          status: "done",
          url,
          originFileObj: null, // signifies existing server image
        };
      });
      setImageList(files);
      setUploadedImageIds(data.image.map((img) => img.id || img._id));
    }
  } catch (error) {
    message.error("Failed to fetch product details");
  }
  setLoading(false);
};


  const handleImageChange = ({ fileList }) => {
    setImageList(fileList);
    setUploadedImageIds([]);
  };

  const apiUpload = `${API_BASE_URL}media`;

  const uploadImages = async () => {
    if (!imageList.length) {
      message.error("Please select images first");
      return;
    }
    setUploading(true);
    try {
      const ids = [];
      for (const file of imageList) {
        if (file.origin === "server") {
          // Already uploaded file from server
          ids.push(file.url.split("/media/")[1]);
        } else if (file.originFileObj) {
          const formData = new FormData();
          formData.append("media", file.originFileObj);
          const res = await fetch(apiUpload, {
            method: "POST",
            body: formData,
          });
          if (!res.ok) throw new Error("Upload failed");
          const resData = await res.json();
          ids.push(resData.data);
        }
      }
      setUploadedImageIds(ids);
      message.success("Images uploaded successfully");
    } catch {
      message.error("Failed to upload images");
      setUploadedImageIds([]);
    } finally {
      setUploading(false);
    }
  };

  const removeImages = () => {
    setImageList([]);
    setUploadedImageIds([]);
  };

  const onSubmit = async (formData) => {
  if (uploadedImageIds.length === 0) {
    message.error("Please upload and confirm images");
    return;
  }

  // Create proper image objects array
  const imagesForPayload = uploadedImageIds.map(id => ({ id }));

  setLoading(true);

  try {
    const payload = {
      ...formData,
      image: imagesForPayload,
    };

    if (id) {
      await axios.put(`${API_BASE_URL}product/${id}`, payload);
      message.success("Product updated successfully");
    } else {
      await axios.post(`${API_BASE_URL}product`, payload);
      message.success("Product added successfully");
    }

    reset();
    setImageList([]);
    setUploadedImageIds([]);
    navigate("/dashboard/ProductList");
  } catch {
    message.error(id ? "Failed to update product" : "Failed to add product");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        {id ? "Edit Product" : "Add New Product"}
      </h2>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Product Name"
          required
          validateStatus={control._formState.errors?.name ? "error" : ""}
          help={control._formState.errors?.name?.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Product name is required" }}
            render={({ field }) => <Input {...field} placeholder="Enter product name" />}
          />
        </Form.Item>

        <Form.Item label="Product Images" required>
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={imageList}
            onChange={handleImageChange}
            beforeUpload={() => false}
            multiple
          >
            {imageList.length >= 5 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          {imageList.length > 0 && uploadedImageIds.length === 0 && (
            <Button onClick={uploadImages} type="primary" loading={uploading} style={{ marginTop: 8 }}>
              Upload
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
          validateStatus={control._formState.errors?.category ? "error" : ""}
          help={control._formState.errors?.category?.message}
        >
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select {...field} placeholder="Select category" allowClear>
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
          validateStatus={control._formState.errors?.description ? "error" : ""}
          help={control._formState.errors?.description?.message}
        >
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => <Input.TextArea {...field} placeholder="Enter product description" rows={4} />}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          required
          validateStatus={control._formState.errors?.price ? "error" : ""}
          help={control._formState.errors?.price?.message}
        >
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Price cannot be negative" },
            }}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Form.Item
          label="Discounted Price"
          validateStatus={control._formState.errors?.productDiscountedPrice ? "error" : ""}
          help={control._formState.errors?.productDiscountedPrice?.message}
        >
          <Controller
            name="productDiscountedPrice"
            control={control}
            rules={{
              min: { value: 0, message: "Discounted price cannot be negative" },
            }}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Form.Item
          label="Count in Stock"
          required
          validateStatus={control._formState.errors?.countInStock ? "error" : ""}
          help={control._formState.errors?.countInStock?.message}
        >
          <Controller
            name="countInStock"
            control={control}
            rules={{
              required: "Stock count is required",
              min: { value: 0, message: "Stock count cannot be negative" },
            }}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {id ? "Update Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
