import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Spin, Popconfirm, Carousel } from "antd";
import { API_BASE_URL } from "../../config";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const API = `${API_BASE_URL}product`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    }
    setLoading(false);
  }

  const paginatedData = products.slice((current - 1) * pageSize, current * pageSize);

  const handlePageChange = (page) => {
    setCurrent(page);
  };

  const handleEdit = (record) => {
    navigate(`/dashboard/ProductList/${record._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };

  const handleAddCategory = () => {
    navigate("/dashboard/CategoryList/add");
  };

  const handleAddProduct = () => {
    navigate("/dashboard/ProductList/add");
  };
  const getImageUrl = (url) => {
    console.log("url>>>>>>>>", url);

    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("assets/")) {
      return `${API_BASE_URL}${url}`;
    }
    return `${API_BASE_URL}${url}`;
  };
  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      render: (text, record, index) => (current - 1) * pageSize + index + 1,
      width: 80,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text, record) => {
        // Safety: Only attempt if images exist and array is not empty
        const images = Array.isArray(record.image) ? record.image : [];
        const getImageUrl = (url) => {
          if (!url) return "";
          if (url.startsWith("http")) return url;
          if (url.startsWith("assets/")) {
            return `${API_BASE_URL}${url}`;
          }
          return `${API_BASE_URL}${url}`;
        };

        // If more than one image, show slider. Else show single image.
        return (
          <div className="flex items-center gap-3">
            {images.length > 1 ? (
              <Carousel
                dots={false}
                arrows
                style={{ width: 50, height: 50 }}
                autoplay={true}      // <-- Enable auto-scrolling
                autoplaySpeed={2000} // <-- Optional: set speed in ms (e.g. 2 seconds)
                draggable
              >
                {images.map((imgObj, idx) => (
                  <div key={imgObj._id || idx}>
                    <img
                      src={getImageUrl(imgObj?.image_url?.thumbnail?.low_res)}
                      alt={text || record?.name?.original || "Product Image"}
                      style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              // one or zero image
              <img
                src={getImageUrl(images[0]?.image_url?.thumbnail?.low_res)}
                alt={text || record?.name?.original || "Product Image"}
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category) => category || "Uncategorized",
    },
    { title: "Price", dataIndex: "price", key: "price", width: 100, render: (val) => `₹${val}` },
    {
      title: "Discounted Price",
      dataIndex: "productDiscountedPrice",
      key: "productDiscountedPrice",
      width: 140,
      render: (val) => (val ? `₹${val}` : "-"),
    },
    {
      title: "Stock",
      dataIndex: "countInStock",
      key: "countInStock",
      width: 80,
    },
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
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Product Listing</h2>

      <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button type="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
        <Button type="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey={(record) => record.id}
          pagination={{
            current,
            pageSize,
            total: products.length,
            onChange: handlePageChange,
          }}
          scroll={{ x: 900 }}
          bordered
        />
      )}
    </div>
  );
}
