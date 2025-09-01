import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Spin, Popconfirm, Carousel } from "antd";
import { API_BASE_URL } from "../../config";
// import { toast } from "react-toastify"; // Uncomment if using toast

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
      // toast.error("Failed to fetch products");
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
      // toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      // toast.error("Delete failed");
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
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (text, record) => {
        const images = Array.isArray(record.image) ? record.image : [];
        return (
          <div className="flex flex-col xs:flex-row sm:flex-row items-center gap-2 min-w-[150px]">
            {images.length > 1 ? (
              <div className="w-[50px] h-[50px]">
                <Carousel
                  dots={false}
                  arrows
                  style={{ width: 50, height: 50 }}
                  autoplay={true}
                  autoplaySpeed={2000}
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
              </div>
            ) : (
              <img
                src={getImageUrl(images[0]?.image_url?.thumbnail?.low_res)}
                alt={text || record?.name?.original || "Product Image"}
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
            <span className="text-xs sm:text-sm font-medium break-all max-w-[120px]">{text}</span>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category) => category || "Uncategorized",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 90,
      render: (val) => `₹${val}`,
    },
    {
      title: "Discounted Price",
      dataIndex: "productDiscountedPrice",
      key: "productDiscountedPrice",
      width: 120,
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
      width: 120,
      render: (text, record) => (
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
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
    <div className="px-2 py-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Product Listing</h2>

      <div className="mb-4 flex flex-wrap gap-2 justify-end">
        <Button type="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
        <Button type="primary" onClick={handleAddProduct}>
          Add Product
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
            rowKey={(record) => record._id || record.id}
            pagination={{
              current,
              pageSize,
              total: products.length,
              onChange: handlePageChange,
              showSizeChanger: false,
            }}
            scroll={{ x: 800 }}
            bordered
            className="min-w-[650px]"
          />
        )}
      </div>
    </div>
  );
}
