import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Table, Button, Popconfirm, Carousel, Spin } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";

const getBaseUrl = () => API_BASE_URL;

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("assets/")) return `${getBaseUrl()}${url}`;
  return `${getBaseUrl()}${url}`;
};

export default function ProductSliderList() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${getBaseUrl()}slider`);
      setSliders(res.data);
    } catch (e) {
      toast.error("Failed to load sliders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${getBaseUrl()}slider/${id}`);
      toast.success("Slider deleted successfully");
      setSliders(sliders => sliders.filter(s => s._id !== id));
    } catch {
      toast.error("Failed to delete slider");
    }
  };

  const columns = [
    {
      title: "Slider Name",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (text, record) => (
        <Link className="font-semibold text-blue-600 hover:underline" to={`/slider/${record._id}`}>
          {text}
        </Link>
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 350,
      ellipsis: {
        showTitle: false,
      },
      render: text => <span title={text}>{text}</span>
    },
    {
      title: "Related Product",
      dataIndex: ["product", "name"],
      key: "productName",
      width: 220,
      render: (text, record) =>
        record.product ? (
          <Link className="text-blue-600 hover:underline" to={`/product/${record.product._id}`}>
            {text}
          </Link>
        ) : "N/A"
    },
    {
      title: "Images",
      dataIndex: "image",
      key: "images",
      width: 180,
      render: images => {
        if (!images || images.length === 0) return "No Images";

        return (
          <div style={{ width: 150 }}>
            <Carousel dots={false} arrows slidesToShow={1} autoplay>
              {images.map(imgObj => {
                const imgUrl =
                  imgObj.image_url?.thumbnail?.low_res ||
                  imgObj.image_url?.full?.low_res ||
                  "";
                return (
                  <img
                    key={imgObj._id}
                    src={getImageUrl(imgUrl)}
                    alt="slider img"
                    style={{
                      width: "100%",
                      height: 100,
                      objectFit: "contain",
                      borderRadius: 8
                    }}
                  />
                );
              })}
            </Carousel>
          </div>
        );
      }
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-2 flex-wrap">
          <Popconfirm
            title="Are you sure to delete this slider?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Sliders</h2>
        <Button type="primary" onClick={() => navigate("/dashboard/ProductSliderList/add")}>
          + Add Slider
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : sliders.length === 0 ? (
        <div className="text-center text-gray-500 p-6">
          No sliders available. Please add new sliders.
        </div>
      ) : (
        <div className="overflow-x-auto rounded bg-white shadow">
          <Table
            columns={columns}
            dataSource={sliders}
            rowKey={record => record._id}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
            bordered
            size="middle"
            className="min-w-full"
          />
        </div>
      )}
    </div>
  );
}
