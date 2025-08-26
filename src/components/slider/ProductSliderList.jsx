import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Popconfirm, Carousel } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

const getBaseUrl = () => API_BASE_URL;

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}${url}`;
};

export default function ProductSliderList() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}slider`)
      .then((res) => setSliders(res.data))
      .catch(() => toast.error("Failed to load sliders"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${getBaseUrl()}slider/${id}`);
      toast.success("Slider deleted successfully!");
      // Refresh the list after delete
      setSliders(sliders => sliders.filter(s => s._id !== id));
      // Alternatively, you could re-fetch: await axios.get... but local filter is faster UX
    } catch (err) {
      toast.error("Failed to delete slider.");
    }
  };


  const columns = [
    {
      title: "Slider Name",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (text, record) => (
        <Link
          to={`/slider/${record._id}`}
          className="font-semibold text-blue-600 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 350,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: "Related Product",
      dataIndex: ["product", "name"],
      key: "productName",
      width: 220,
      render: (text, record) =>
        record.product ? (
          <Link
            to={`/product/${record.product._id}`}
            className="text-blue-600 hover:underline"
          >
            {text}
          </Link>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Images",
      dataIndex: "image",
      key: "images",
      width: 180,
      render: (images) => {
        if (!images || images.length === 0) return "No Images";

        return (
          <div style={{ width: 150 }}>
            <Carousel dots={false} arrows slidesToShow={1} autoplay>
              {images.map((imgObj) => {
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
                      borderRadius: 8,
                    }}
                  />
                );
              })}
            </Carousel>
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* <Button
            size="small"
            type="primary"
            onClick={() => navigate(`/slider/edit/${record._id}`)}
          >
            Edit
          </Button> */}
          <Popconfirm
            title="Are you sure to delete this slider?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!sliders.length) {
    return (
      <div className="text-center py-10">
        No sliders found.
      </div>
    );
  }

  return (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Sliders</h2>
      <Button
        type="primary"
        onClick={() => navigate("/dashboard/ProductSliderList/add")}
      >
        + Add Slider
      </Button>
    </div>

    {sliders.length === 0 ? (
      <div className="p-6 text-center text-gray-500">
        No sliders available. Please add new sliders.
      </div>
    ) : (
      <Table
        columns={columns}
        dataSource={sliders}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
        bordered
      />
    )}
  </div>
);

}
